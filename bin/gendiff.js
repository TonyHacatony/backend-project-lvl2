#!/usr/bin/env node

import { program } from 'commander';
import { getDiff, getFilesData } from '../index.js';
import findFormatter from './src/formatters/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>', 'filepath for first file')
  .argument('<filepath2>', 'filepath for second file')
  .option('-f, --format <type>', 'output format', 'tree')
  .action((filepath1, filepath2) => {
    const [data1, data2] = getFilesData(filepath1, filepath2);
    const formatter = findFormatter(program.opts().format);
    console.log(formatter(getDiff(data1, data2)));
  })
  .parse(process.argv);
