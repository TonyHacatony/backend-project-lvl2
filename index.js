import path from 'path';
import { readFileSync } from 'node:fs';
import parse from './src/parser.js';

const makeRow = (key, value, sign = ' ') => `${sign} ${key}: ${value}\n`;

const handleRow = (acc, key, obj1, obj2) => {
  const updAcc = (text) => `${acc} ${text}`;
  if (!(Object.hasOwn(obj1, key))) {
    return updAcc(makeRow(key, obj2[key], '+'));
  }
  if (!(Object.hasOwn(obj2, key))) {
    return updAcc(makeRow(key, obj1[key], '-'));
  }
  if (obj1[key] !== obj2[key]) {
    return updAcc(`${makeRow(key, obj1[key], '-')} ${makeRow(key, obj2[key], '+')}`);
  }
  return updAcc(makeRow(key, obj1[key]));
};

const filepathToObject = (filepath) => {
  const resolvedPath = path.resolve(filepath);
  const file = readFileSync(resolvedPath, 'utf8');
  return parse(file, path.extname(filepath));
};

const getDiff = (obj1, obj2) => {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();
  return `${keys.reduce((acc, key) => handleRow(acc, key, obj1, obj2), '{\n')}}`;
};

const getFilesData = (...filepath) => [...filepath].map(filepathToObject);

export { getDiff, getFilesData };
