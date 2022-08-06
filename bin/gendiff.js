#!/usr/bin/env node

import { program } from 'commander';
import path from 'path';
import { readFileSync } from 'node:fs';
import parse from '../src/parser.js';
import getDiff from '../src/differ.js';

const filepathToObject = (filepath) => {
  const finalFilePath1 = path.resolve(filepath);
  const file1 = readFileSync(finalFilePath1, 'utf8');
  return parse(file1, path.extname(filepath));
};

const action = (filepath1, filepath2) => {
  const filePaths = [filepath1, filepath2];
  const objects = filePaths.map(filepathToObject);
  const [obj1, obj2] = objects;
  const diff = getDiff(obj1, obj2);
  console.log(diff);
};

program
  .version('0.0.1')
  .argument('<filepath1>', 'filepath for first file')
  .argument('<filepath2>', 'filepath for second file')
  .option('-f, --format', 'output format', 'Default format')
  .action(action)
  .parse(process.argv);
