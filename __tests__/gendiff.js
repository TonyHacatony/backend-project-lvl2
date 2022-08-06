// import { readFileSync } from 'node:fs';
// import path from 'path';
import { getDiff, getFilesData } from '../index.js';

const filepath1 = '__fixtures__/file1.json';
const filepath2 = '__fixtures__/file2.json';
const filepathResult1 = '__fixtures__/result1.txt';

test('path test', () => {
  const [data1, data2, resData] = getFilesData(filepath1, filepath2, filepathResult1);
  const diff = getDiff(data1, data2);
  console.log(`Diff: ${diff} result: ${resData}`);
  expect(diff).toEqual(resData);
});
