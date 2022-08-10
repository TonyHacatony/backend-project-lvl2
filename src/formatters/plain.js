import _ from 'lodash';

const textWithQuotationMarks = (text) => (typeof text === 'string' ? `'${text}'` : text);

const converValue = (value) => (_.isObject(value) ? '[complex value]' : textWithQuotationMarks(value));

const stylish = (diff, previousPath = []) => diff.reduce((acc, objKey) => {
  const updAcc = (text) => `${acc}${text}`;
  const {
    key, value, oldValue, status, children,
  } = objKey;
  const path = [...previousPath, key].join('.');
  if (children !== undefined) {
    const rows = stylish(children, [...previousPath, key]);
    return updAcc(`${rows}`);
  }
  if (status === 'deleted') {
    return updAcc(`Property '${path}' was removed\n`);
  }
  if (status === 'added') {
    const val = converValue(value);
    return updAcc(`Property '${path}' was added with value: ${val}\n`);
  }
  if (status === 'changed') {
    const val = converValue(value);
    const oldVal = converValue(oldValue);
    return updAcc(`Property '${path}' was updated. From ${oldVal} to ${val}\n`);
  }
  return acc;
}, '');

export default stylish;
