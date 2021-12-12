import has from 'lodash/has.js';

const genDiff = (obj1, obj2) => {
  let result = '';
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqueKeys = [...keys1, ...keys2]
    .filter((key, idx, arr) => arr.indexOf(key) === idx).sort();

  if (uniqueKeys.length) {
    result += '{\n';
    for (let i = 0; i < uniqueKeys.length; i += 1) {
      const key = uniqueKeys[i];
      if (obj1[key] === obj2[key]) {
        result += `    ${key}: ${obj1[key]}\n`;
      } else if (has(obj1, key) && !has(obj2, key)) {
        result += `  - ${key}: ${obj1[key]}\n`;
      } else if (!has(obj1, key) && has(obj2, key)) {
        result += `  + ${key}: ${obj2[key]}\n`;
      } else {
        result += `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
      }
    }
    result += '}\n';
  }

  return result;
};

export default genDiff;
