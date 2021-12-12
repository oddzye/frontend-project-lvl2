#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const getFileConent = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  return readFileSync(absolutePath, 'utf-8');
};

const isJSON = (filePath) => path.extname(filePath) === '.json';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    if (isJSON(filepath1) && isJSON(filepath2)) {
      const file1Content = getFileConent(filepath1);
      const file2Content = getFileConent(filepath2);
      const diff = genDiff(JSON.parse(file1Content), JSON.parse(file2Content));
      console.log(diff);
    }
  })
  .parse();
