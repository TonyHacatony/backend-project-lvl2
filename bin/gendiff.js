#!/usr/bin/env node

import { program } from 'commander';
import { getDiff, getFilesData } from '../index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>', 'filepath for first file')
  .argument('<filepath2>', 'filepath for second file')
  .option('-f, --format', 'output format', 'Default format')
  .action((filepath1, filepath2) => {
    const [data1, data2] = getFilesData(filepath1, filepath2);
    console.log(getDiff(data1, data2));
  })
  .parse(process.argv);
