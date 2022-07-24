#!/usr/bin/env node

import { program } from 'commander';

const action = (filepath1, filepath2, format) => {
    console.log(`Diff with format between files: ${filepath1} - ${filepath2}. With format ${format}`);
};


program
  .version('0.0.1')
  .argument('<filepath1>', 'filepath for first file')
  .argument('<filepath2>', 'filepath for second file')
  .option('-f, --format', 'output format', 'Default format')
  .action(action)
  .parse(process.argv);