import _ from 'lodash';

const makeEmptyLine = (length) => (length >= 1 ? ' '.repeat(length) : '');

const makeSimpleRow = (key, value, length) => `${makeEmptyLine(length)}${key}: ${value}\n`;

const makeKey = (key, length, sign) => {
  if (sign === undefined) {
    return `${makeEmptyLine(length)}${key}:`;
  }
  return `${makeEmptyLine(length - 2)}${sign} ${key}:`;
};

const objToString = (obj, space) => {
  const data = Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const updAcc = (text) => `${acc} ${text}`;
    if (_.isObject(value)) {
      return updAcc(`${makeEmptyLine(space)}${key}: ${objToString(value, space + 4)}`);
    }
    return updAcc(`${makeEmptyLine(space)}${key}: ${value}\n`);
  }, '{\n');
  return `${data}${makeEmptyLine(space - 3)}}\n`;
};

const makeValue = (value, startSpace) => {
  if (_.isObject(value)) {
    return `${(objToString(value, startSpace + 4))}`;
  }
  return `${value}\n`;
};

const stylish = (diff, startSpace = 3) => {
  const data = diff.reduce((acc, objKey) => {
    const updAcc = (text) => `${acc} ${text}`;
    const {
      key, value, oldValue, status, children,
    } = objKey;
    if (children !== undefined) {
      const k = makeKey(key, startSpace);
      const v = stylish(children, startSpace + 4);
      return updAcc(`${k} ${v}`);
    }
    if (status === 'deleted') {
      const k = makeKey(key, startSpace, '-');
      const v = makeValue(value, startSpace);
      return updAcc(`${k} ${v}`);
    }
    if (status === 'added') {
      const k = makeKey(key, startSpace, '+');
      const v = makeValue(value, startSpace);
      return updAcc(`${k} ${v}`);
    }
    if (status === 'changed') {
      let rows;
      const minusKey = makeKey(key, startSpace, '-');
      const minusValue = makeValue(oldValue, startSpace);
      rows = `${minusKey} ${minusValue}`;
      const plusKey = makeKey(key, startSpace, '+');
      const plusValue = makeValue(value, startSpace);
      rows = `${rows} ${plusKey} ${plusValue}`;
      return updAcc(rows);
    }
    return updAcc(makeSimpleRow(key, value, startSpace));
  }, '{\n');
  const lastSpace = startSpace - 3;
  return `${data}${makeEmptyLine(lastSpace)}}\n`;
};

export default stylish;
