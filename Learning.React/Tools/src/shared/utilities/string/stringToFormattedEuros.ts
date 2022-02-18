import stringToNumber from './stringToNumber';
import numberWithSeparationEveryThousand from '../number/numberWithSpaceEveryThousand';

const stringToFormattedEuros = (text? : string) : string => {
  const textAsNumber = stringToNumber(text, 0) as number;

  return textAsNumber > 1000 || textAsNumber < 1000 ? `${numberWithSeparationEveryThousand(Math.round(textAsNumber / 1000))} K€` : `${textAsNumber} €`;
};

export default stringToFormattedEuros;
