import path from 'path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

import parse from './src/parser.js';

const filepathToObject = (filepath) => {
  const resolvedPath = path.resolve(filepath);
  const file = readFileSync(resolvedPath, 'utf8');
  return parse(file, path.extname(filepath));
};

const getDiff = (obj1, obj2) => {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();
  const diffObject = keys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const keyObject = { key };
    if (_.isObject(value1) && _.isObject(value2)) {
      keyObject.children = getDiff(value1, value2);
    } else if (value1 === value2) {
      keyObject.status = 'unchanged';
      keyObject.value = value1;
    } else if (value1 === undefined) {
      keyObject.status = 'added';
      keyObject.value = value2;
    } else if (value2 === undefined) {
      keyObject.status = 'deleted';
      keyObject.value = value1;
    } else {
      keyObject.status = 'changed';
      keyObject.value = value2;
      keyObject.oldValue = value1;
    }
    acc.push(keyObject);
    return acc;
  }, []);
  return diffObject;
};

const getFilesData = (...filepath) => [...filepath].map(filepathToObject);

export { getDiff, getFilesData };
