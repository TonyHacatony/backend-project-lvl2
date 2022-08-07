import _ from 'lodash';

export const minusKey = Symbol('minus');
export const plusKey = Symbol('plus');

const makeEmptyLine = (length) => (length >= 1 ? ' '.repeat(length) : '');

const makeSimpleRow = (key, value, length) => `${makeEmptyLine(length)}${key}: ${value}\n`;

const makeKey = (key, length, sign) => {
  if (sign === undefined) {
    return `${makeEmptyLine(length)}${key}:`;
  }
  return `${makeEmptyLine(length - 2)}${sign} ${key}:`;
};

const makeValue = (value, startSpace, stylishFunc) => {
  if (_.isObject(value)) {
    return ` ${stylishFunc(value, startSpace + 4)}`;
  }
  return ` ${value}\n`;
};

export const stylish = (diff, startSpace = 3) => {
  const data = Object.keys(diff).reduce((acc, key) => {
    const updAcc = (text) => `${acc} ${text}`;
    const value = diff[key];
    if (_.isObject(value)) {
      const [minus, plus] = [value[minusKey], value[plusKey]];
      if (minus === undefined && plus === undefined) {
        const k = makeKey(key, startSpace);
        const v = stylish(value, startSpace + 4);
        return updAcc(`${k} ${v}`);
      }
      let rows = acc;
      if (minus !== undefined) {
        const k = makeKey(key, startSpace, '-');
        const v = makeValue(minus, startSpace, stylish);
        rows = `${rows} ${k}${v}`;
      }
      if (plus !== undefined) {
        const k = makeKey(key, startSpace, '+');
        const v = makeValue(plus, startSpace, stylish);
        rows = `${rows} ${k}${v}`;
      }
      return rows;
    }
    return updAcc(makeSimpleRow(key, value, startSpace));
  }, '{\n');
  const lastSpace = startSpace - 3;
  return `${data}${makeEmptyLine(lastSpace)}}\n`;
};
