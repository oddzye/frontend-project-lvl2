import { test, expect, beforeAll } from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../index.js';

let file1Obj;
let file2Obj;

beforeAll(() => {
  file1Obj = JSON.parse(readFileSync(path.resolve('./__fixtures__/file1.json')));
  file2Obj = JSON.parse(readFileSync(path.resolve('./__fixtures__/file2.json')));
});

test('genDiff', () => {
  const diff = genDiff(file1Obj, file2Obj);
  console.log(diff);
  expect(diff).toEqual('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}\n');
});
