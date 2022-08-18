const [...smallUnits] = '个拾佰仟';
const [...bigUnits] = '元万亿兆京';
const [...numberTexts] = '零壹贰叁肆伍陆柒捌玖';
const [...decimalUnits] = '角分';

export default function toCapitalChinese(input: number | string): string {
  const number = Number.parseFloat(String(input));
  if (!Number.isFinite(number)) {
    return '';
  }
  if (number === 0) {
    return numberTexts[0];
  }
  if (Math.floor(number * 100) === 0) {
    return numberTexts[0];
  }
  // debugger;
  const numberStr = String(number);
  const [integerStr, decimalStr = ''] = numberStr.split('.');
  const [..._numberChars] = integerStr;
  const numberChars = _numberChars.reverse();
  const capNumList = numberChars.map(num => numberTexts[Number.parseInt(num, 10)]);
  const capNumWithUnitList = capNumList
    .map((capNum, index) => {
      if(capNum === numberTexts[0]) {
        return capNum;
      }
      return `${capNum}${smallUnits[index % 4] || ''}`;
    });
  const capNumWithAllUnitList = capNumWithUnitList.map((capNum, index) => {
    if (index % 4 === 0) {
      const bigUnitIndex = Number.parseInt(String(index / 4), 10);
      return `${capNum}${bigUnits[bigUnitIndex] || ''}`;
    }
    return capNum;
  });
  const safeDecimalStr = decimalStr.slice(0, 2);
  const [...decimalChars] = safeDecimalStr;
  const capDecNumList = decimalChars.map(num => numberTexts[Number.parseInt(num, 10)]);
  const capDecNumWithUnitList = capDecNumList
    .map((capNum, index) => `${capNum}${decimalUnits[index] || ''}`);
  let wholeStr = '';
  if (decimalStr.length < 2) {
    wholeStr = '整';
  }
  let currencyText = capNumWithAllUnitList.reverse().join('')
    + capDecNumWithUnitList.join('') + wholeStr;
  // 清除"个"
  currencyText = currencyText.split(smallUnits[0]).join('');
  // 清除连续"零"
  currencyText = currencyText.replace(/零+/ig, '零');
  // 清除零大单位
  bigUnits.forEach(unit => {
    currencyText = currencyText.split(`零${unit}`).join(unit);
  });
  // 清除大单位后接着小单位
  bigUnits.forEach((unit, index) => {
    for (let i = 1; i < index; i += 1) {
      const preUnit = bigUnits[i];
      const unitJoinText = unit + preUnit;
      currencyText = currencyText.split(unitJoinText).join(unit);
    }
  });
  // 将兆，京转换习惯表示
  currencyText = currencyText.split('兆').join('万亿');
  currencyText = currencyText.split('京').join('亿亿');
  // 处理零角
  currencyText = currencyText.split('零角').join('零');
  if (currencyText.startsWith('元')) {
    currencyText = currencyText.slice(1);
  }
  return currencyText;
};
