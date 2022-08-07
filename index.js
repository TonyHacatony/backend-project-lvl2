import path from 'path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

import parse from './src/parser.js';
import { stylish, minusKey, plusKey } from './src/stylish.js';

const filepathToObject = (filepath) => {
  const resolvedPath = path.resolve(filepath);
  const file = readFileSync(resolvedPath, 'utf8');
  return parse(file, path.extname(filepath));
};

const findDiff = (obj1, obj2) => {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();
  const diffObject = keys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    let value = {};
    if (_.isObject(value1) && _.isObject(value2)) {
      value = findDiff(value1, value2);
    } else if (value1 === value2) {
      value = value1;
    } else if (value1 === undefined) {
      value[plusKey] = value2;
    } else if (value2 === undefined) {
      value[minusKey] = value1;
    } else {
      value[plusKey] = value2;
      value[minusKey] = value1;
    }
    acc[key] = value;
    return acc;
  }, {});
  return diffObject;
};

const getDiff = (obj1, obj2) => {
  const diff = findDiff(obj1, obj2);
  return stylish(diff).trim();
};

const getFilesData = (...filepath) => [...filepath].map(filepathToObject);

export { getDiff, getFilesData };
