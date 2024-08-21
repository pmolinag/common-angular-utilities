#!/usr/bin/env node

const { execSync } = require('child_process');

const [, , schematic] = process.argv;

if (!schematic) {
	console.error('Error: No schematic specified. Please provide a schematic name.');
	process.exit(1);
}

try {
	console.log('Installing needed dependencies');
	execSync('npm install -g common-ng-utilities', { stdio: 'inherit' });
	execSync('npm install -g @angular-devkit/schematics-cli', { stdio: 'inherit' });
	execSync('npm install -g typescript', { stdio: 'inherit' });

	console.log(`Running schematic: ${schematic}`);
	execSync(`schematics common-ng-utilities:${schematic}`, { stdio: 'inherit' });

	console.log('Schematic execution completed successfully.');
} catch (error) {
	console.error('An error occurred:', error);
	process.exit(1);
} finally {
	console.log('Uninstalling needed dependencies');
	execSync('npm uninstall -g common-ng-utilities', { stdio: 'inherit' });
	execSync('npm uninstall -g @angular-devkit/schematics-cli', { stdio: 'inherit' });
	execSync('npm uninstall -g typescript', { stdio: 'inherit' });
}
