import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';

function toPascalCase(str: string): string {
	return str
		.toLowerCase()
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
}

function isPascalCase(str: string): boolean {
	const pascalCasePattern = /^[A-Z][a-zA-Z0-9]*$/;
	return pascalCasePattern.test(str);
}

function collectEnumNames(sourceFile: ts.SourceFile): { [key: string]: string } {
	const enumNames: { [key: string]: string } = {};

	const visit = (node: ts.Node): void => {
		if (ts.isEnumDeclaration(node)) {
			const name = node.name.text;
			if (!isPascalCase(name)) {
				const newName = toPascalCase(name);
				enumNames[name] = newName;
			}
		}
		ts.forEachChild(node, visit);
	};

	visit(sourceFile);
	return enumNames;
}

function updateReferences(fileContent: string, enumNames: { [key: string]: string }): string {
	const sourceFile = ts.createSourceFile('temp.ts', fileContent, ts.ScriptTarget.Latest, true);

	const changes: { start: number; end: number; text: string }[] = [];

	const visit = (node: ts.Node): void => {
		if (ts.isPropertyAccessExpression(node)) {
			const expression = node.expression;

			if (ts.isIdentifier(expression) && enumNames[expression.text]) {
				changes.push({
					start: expression.getStart(sourceFile),
					end: expression.getEnd(),
					text: enumNames[expression.text],
				});
			}
		} else if (ts.isIdentifier(node) && !ts.isPropertyAccessExpression(node.parent) && enumNames[node.text]) {
			changes.push({
				start: node.getStart(sourceFile),
				end: node.getEnd(),
				text: enumNames[node.text],
			});
		}
		ts.forEachChild(node, visit);
	};

	visit(sourceFile);

	let updatedContent = fileContent;
	for (let i = changes.length - 1; i >= 0; i--) {
		const change = changes[i];
		updatedContent = updatedContent.slice(0, change.start) + change.text + updatedContent.slice(change.end);
	}

	return updatedContent;
}

export function convertEnums(): Rule {
	return (tree: Tree, _context: SchematicContext) => {
		const enumNames: { [key: string]: string } = {};

		const isNodeModulesPath = (filePath: string): boolean => {
			return filePath.includes('node_modules');
		};

		tree.visit((filePath) => {
			if (filePath.endsWith('.ts') && !isNodeModulesPath(filePath)) {
				const fileContent = tree.read(filePath)?.toString();
				if (fileContent) {
					const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
					const collectedEnumNames = collectEnumNames(sourceFile);
					Object.assign(enumNames, collectedEnumNames);
				}
			}
		});

		tree.visit((filePath) => {
			if (filePath.endsWith('.ts') && !isNodeModulesPath(filePath)) {
				const fileContent = tree.read(filePath)?.toString();
				if (fileContent) {
					const updatedContent = updateReferences(fileContent, enumNames);
					tree.overwrite(filePath, updatedContent);
				}
			}
		});

		return tree;
	};
}
