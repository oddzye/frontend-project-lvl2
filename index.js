#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import { readFileSync } from 'fs';

const getFileConent = (filePath) => {
    const absolutePath = path.resolve(process.cwd(), filePath);
    return readFileSync(absolutePath, 'utf-8');
};

const isJSON = (filePath) => {
    return path.extname(filePath) === '.json';
};

const genDiff = (obj1, obj2) => {
    let result = '';
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const uniqueKeys = [...keys1, ...keys2].filter((key, idx, arr) => arr.indexOf(key) === idx).sort();

    if (uniqueKeys.length) {
        result += `{\n`;
        for (let i = 0; i < uniqueKeys.length; i += 1) {
            const key = uniqueKeys[i];
            if (obj1[key] === obj2[key]) {
                result += `    ${key}: ${obj1[key]}\n`;
            } else if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
                result += `  - ${key}: ${obj1[key]}\n`;
            } else if (!obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
                result += `  + ${key}: ${obj2[key]}\n`;
            } else {
                result += `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
            }
        }
        result += `}\n`;
    }
    

    return result;
};

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

    export default genDiff;