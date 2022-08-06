const makeRow = (key, value, sign = ' ') => `${sign} ${key}: ${value}\n`;

const handleRow = (acc, key, obj1, obj2) => {
  const updAcc = (text) => `${acc} ${text}`;
  if (obj1[key] === undefined) {
    return updAcc(makeRow(key, obj2[key], '+'));
  }
  if (obj2[key] === undefined) {
    return updAcc(makeRow(key, obj1[key], '-'));
  }
  if (obj1[key] !== obj2[key]) {
    return updAcc(`${makeRow(key, obj1[key], '-')} ${makeRow(key, obj2[key], '+')}`);
  }
  return updAcc(makeRow(key, obj1[key]));
};

const getDiff = (obj1, obj2) => {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();
  const data = `${keys.reduce((acc, key) => handleRow(acc, key, obj1, obj2), '{\n')}}`;
  return data;
};

export default getDiff;
