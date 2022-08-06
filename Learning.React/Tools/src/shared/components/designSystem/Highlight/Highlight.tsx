import React, { FC } from 'react';
import removeHtmlTags from '../../../utilities/removeHtmlTags';

interface Props {
  text: string;
  searchTerm: string;
  color?: string;
}

const Highlight: FC<Props> = ({ text, searchTerm, color }) => {
  const newText = removeHtmlTags(text).replaceAll(
    new RegExp(searchTerm, 'ig'),
    (oldText) => `<span style="color :${color ?? 'red'}">${oldText}</span>`,
  );

  return <div dangerouslySetInnerHTML={{ __html: newText }} />;// eslint-disable-line
};

export default Highlight;
