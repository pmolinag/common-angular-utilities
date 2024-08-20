import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';

function organizeImports(content: string): string {
	const sourceFile = ts.createSourceFile('temp.ts', content, ts.ScriptTarget.Latest, true);
	const thirdPartyImports: string[] = [];
	const internalImports: string[] = [];

	ts.forEachChild(sourceFile, (node) => {
		if (ts.isImportDeclaration(node)) {
			const importText = node.getFullText(sourceFile).trim();
			if (importText.includes("from './") || importText.includes("from '../") || importText.includes("from 'src/")) {
				internalImports.push(importText);
			} else {
				thirdPartyImports.push(importText);
			}
		}
	});


	const formattedThirdPartyImports = thirdPartyImports
		.sort()
		.map((imp) => `${imp}\n`)
		.join('');

	const formattedInternalImports = internalImports
		.sort()
		.map((imp) => `${imp}\n`)
		.join('');

	const organizedImports = formattedThirdPartyImports + '\n' + formattedInternalImports;
	const importRegex = /^import[^;]+;\s*$/gm;
	const contentWithoutImports = content.replace(importRegex, '');

	if (formattedThirdPartyImports.length > 0 || formattedInternalImports.length > 0) {
		return organizedImports.trim() + '\n\n' + contentWithoutImports.trim();
	} else {
		return contentWithoutImports.trim();
	}
}

export function organizeImportsRule(): Rule {
	return (tree: Tree, _context: SchematicContext) => {
		tree.visit((filePath) => {
			if (filePath.endsWith('.ts') && !isNodeModulesPath(filePath) && !filePath.includes('polyfills')) {
				const content = tree.read(filePath);
				if (content) {
					const organizedContent = organizeImports(content.toString('utf-8'));
					tree.overwrite(filePath, organizedContent + '\n');
				}
			}
		});

		return tree;
	};
}

const isNodeModulesPath = (filePath: string): boolean => {
	return filePath.includes('node_modules');
};
