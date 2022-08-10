import { expect, test } from '@jest/globals';
import { getDiff, getFilesData } from '../index.js';
import findFormatter from '../src/formatters/index.js';

const nestedJson1 = '__fixtures__/file1.json';
const nestedJson2 = '__fixtures__/file2.json';
const nestedYml1 = '__fixtures__/file1.yml';
const nestedYaml2 = '__fixtures__/file2.yaml';

const treeResult = '__fixtures__/result.txt';
const plainResult = '__fixtures__/plain.result.txt';

const incorrectFilepath = '__fixtures__/incorrect.format';

const checkFilesTest = (filepath1, filepath2, result, format = 'tree') => {
  const [data1, data2, resultFile] = getFilesData(filepath1, filepath2, result);
  const formatter = findFormatter(format);
  const diff = getDiff(data1, data2);
  const actual = formatter(diff).trim();
  expect(actual).toBe(resultFile);
};

test('failed format', () => {
  expect(() => getFilesData(incorrectFilepath)).toThrowError();
});

test('tree nested json files', () => checkFilesTest(nestedJson1, nestedJson2, treeResult));

test('tree nested yml files', () => checkFilesTest(nestedYml1, nestedYaml2, treeResult));

test('plain nested json files', () => checkFilesTest(nestedJson1, nestedJson2, plainResult, 'plain'));

test('plain nested yml files', () => checkFilesTest(nestedYml1, nestedYaml2, plainResult, 'plain'));
