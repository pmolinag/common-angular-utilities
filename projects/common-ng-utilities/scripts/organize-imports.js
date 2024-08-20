#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('Running organize-imports script...');
// Construct the Angular CLI command to run the schematic
const command = `ng generate .:organize-imports`;


try {
  // Execute the command and inherit output streams
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Error executing schematic:', error.message);
  process.exit(1);
}

