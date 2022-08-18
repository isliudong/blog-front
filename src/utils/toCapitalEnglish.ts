import { padEnd } from 'lodash';

const units = ['', ' thousand', ' million', ' billion'];

const tenToNineteenNumTexts = [
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
];

const wholeTenNumTexts = [
  'zero',
  'ten',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
];

const zeroToNineNumTexts = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

function formatDecimal(newNumStr: string, decimal: number) {
  let newNum = newNumStr;
  const index = newNum.indexOf('.');
  if (index !== -1) {
    newNum = newNum.substring(0, decimal + index + 1);
  } else {
    newNum = newNum.substring(0);
  }
  return parseFloat(newNum).toFixed(decimal);
}

function toEnglishSmallUnit(numStr: string) {
  let num = numStr;
  let strRet = '';
  if (num.length === 3 && num.substr(0, 3) !== '000') {
    if (num.substr(0, 1) !== '0') {
      strRet += `${zeroToNineNumTexts[num.substr(0, 1)]} hundred`;
      if (num.substr(1, 2) !== '00') strRet += ' and ';
    }
    num = num.substring(1);
  }
  if (num.length === 2) {
    if (num.substr(0, 1) === '0') num = num.substring(1);
    else if (num.substr(0, 1) === '1') strRet += tenToNineteenNumTexts[num.substr(1, 2)];
    else {
      strRet += wholeTenNumTexts[num.substr(0, 1)];
      if (num.substr(1, 1) !== '0') strRet += '-';
      num = num.substring(1);
    }
  }
  if (num.length === 1 && num.substr(0, 1) !== '0') {
    strRet += zeroToNineNumTexts[num.substr(0, 1)];
  }

  return strRet;
}

function splitNumber(str: string){
  const strLength = str.length;
  const group = Math.ceil(strLength / 3);
  const startIndex = strLength - group * 3;
  let result = '';
  let count = 0;
  for (let f = startIndex; f < strLength; f += 3) {
    count+=1;
    const num3 = f >= 0 ? str.substring(f, f + 3) : str.substring(0, startIndex + 3);
    const strEng = toEnglishSmallUnit(num3);
    if (strEng !== '') {
      if (result !== '') result += ',';
      result += toEnglishSmallUnit(num3) + units[group - count];
    }
  }
  return `${result.toUpperCase()}`;
}

export default function capitalCurrencyEn(num: number) {
  let number: string = String(num);
  const dotIndex = number.indexOf('.');
  if (dotIndex !== -1) {
    number = padEnd(number.substr(0, dotIndex + 3), dotIndex + 3, '0');
    number = number.replace('.00', '');
  }
  let valueTest;
  // 小数点下标要重新计算，因为number已经重置了
  if (number.indexOf('.') !== -1) {
    const integer = number.split('.')[0];
    const decimal = number.split('.')[1];
    let decimalWord;
    const interWord = splitNumber(integer);
    if (decimal.length > 2) {
      const newDecimalWord = formatDecimal(number, 2);
      const newDecimal = newDecimalWord.split('.')[1];
      decimalWord = splitNumber(newDecimal);
    } else {
      decimalWord = splitNumber(decimal);
    }
    valueTest = interWord !== '' ? `SAY US DOLLARS ${interWord} AND CENTS ${decimalWord} ONLY`:
    `CENTS ${decimalWord} ONLY`;
  } else {
    valueTest = splitNumber(number);
    valueTest = `SAY US DOLLARS ${valueTest} ONLY`;
  }
  return valueTest.replace(/\s+/g, ' ');
}
