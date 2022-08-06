import { expect, test } from '@jest/globals';
import { getDiff, getFilesData } from '../index.js';

const jsonFilepath1 = '__fixtures__/file1.json';
const jsonFilepath2 = '__fixtures__/file2.json';

const ymlFilepath1 = '__fixtures__/file1.yml';
const ymlFilepath2 = '__fixtures__/file2.yaml';

const incorrectFilepath = '__fixtures__/incorrect.format';

const flatResultFilepath = '__fixtures__/result1.txt';

const flatTest = (filepath1, filepath2) => {
  const [data1, data2, resData] = getFilesData(filepath1, filepath2, flatResultFilepath);
  const diff = getDiff(data1, data2);
  expect(diff).toEqual(resData);
};

test('flat json files', () => flatTest(jsonFilepath1, jsonFilepath2, flatResultFilepath));

test('flat yml files', () => flatTest(ymlFilepath1, ymlFilepath2, flatResultFilepath));

test('failed format', () => {
  expect(() => getFilesData(incorrectFilepath)).toThrowError();
});
