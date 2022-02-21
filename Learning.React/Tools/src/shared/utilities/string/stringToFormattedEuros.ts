import stringToNumber from './stringToNumber';
import formatWithThousandsSeparator from '../number/formatWithThousandsSeparator';

const stringToFormattedEuros = (text? : string) : string => {
  const textAsNumber = stringToNumber(text, 0) as number;

  return textAsNumber > 1000 || textAsNumber < -1000 ? `${formatWithThousandsSeparator(Math.round(textAsNumber / 1000))} K€` : `${textAsNumber} €`;
};

export default stringToFormattedEuros;
