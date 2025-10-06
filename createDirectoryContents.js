import * as fs from 'fs';
import path from 'path';

/**
 * Recursively copy template files to new project path
 * @param {string} templatePath - path to template folder
 * @param {string} targetPath - path to new project folder
 * @param {object} variables - key-value pairs for template replacements
 */
const createDirectoryContents = (templatePath, targetPath, variables = {}) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = path.join(templatePath, file);
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8');

      // Replace template variables like {{PROJECT_NAME}}
      for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        contents = contents.replace(regex, value);
      }

      const writePath = path.join(targetPath, file);
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      const dirPath = path.join(targetPath, file);
      fs.mkdirSync(dirPath, { recursive: true });
      createDirectoryContents(origFilePath, dirPath, variables);
    }
  });
};

export default createDirectoryContents;
