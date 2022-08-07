import { expect, test } from '@jest/globals';
import { getDiff, getFilesData } from '../index.js';

const flatJson1 = '__fixtures__/flat/file1.json';
const flatJson2 = '__fixtures__/flat/file2.json';
const flatYml1 = '__fixtures__/flat/file1.yml';
const flatYaml2 = '__fixtures__/flat/file2.yaml';
const flatResult = '__fixtures__/flat/result.txt';

const nestedJson1 = '__fixtures__/nested/file1.json';
const nestedJson2 = '__fixtures__/nested/file2.json';
const nestedYml1 = '__fixtures__/nested/file1.yml';
const nestedYaml2 = '__fixtures__/nested/file2.yaml';
const nestedResult = '__fixtures__/nested/result.txt';

const incorrectFilepath = '__fixtures__/incorrect.format';

const checkFilesTest = (filepath1, filepath2, result) => {
  const [data1, data2, resData] = getFilesData(filepath1, filepath2, result);
  const diff = getDiff(data1, data2);
  expect(diff).toBe(resData);
};

test('failed format', () => {
  expect(() => getFilesData(incorrectFilepath)).toThrowError();
});

test('flat json files', () => checkFilesTest(flatJson1, flatJson2, flatResult));

test('flat yml files', () => checkFilesTest(flatYml1, flatYaml2, flatResult));

test('nested json files', () => checkFilesTest(nestedJson1, nestedJson2, nestedResult));

test('nested yml files', () => checkFilesTest(nestedYml1, nestedYaml2, nestedResult));
