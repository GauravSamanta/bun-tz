#!/usr/bin/env node

import inquirer from 'inquirer';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import createDirectoryContents from './createDirectoryContents.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CURR_DIR = process.cwd();

// List template folders
const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'));

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'Which project template would you like to generate?',
    choices: CHOICES,
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate(input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      return 'Project name may only include letters, numbers, underscores and hyphens.';
    },
  },
];

inquirer.prompt(QUESTIONS).then(answers => {
  const projectChoice = answers['project-choice'];
  const projectName = answers['project-name'];
  const templatePath = path.join(__dirname, 'templates', projectChoice);
  const projectPath = path.join(CURR_DIR, projectName);

  // Check if folder already exists
  if (fs.existsSync(projectPath)) {
    console.error(`❌ Folder "${projectName}" already exists. Choose a different name.`);
    process.exit(1);
  }

  fs.mkdirSync(projectPath, { recursive: true });

  // Copy template contents
  createDirectoryContents(templatePath, projectPath, { PROJECT_NAME: projectName });

  console.log(`
✅ Project "${projectName}" created successfully!

Next steps:
1. cd ${projectName}
2. uv venv
3. uv sync
`);
});
