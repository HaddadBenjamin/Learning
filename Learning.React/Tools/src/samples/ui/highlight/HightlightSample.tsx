/* eslint-disable  react/no-array-index-key */
import React, { ChangeEvent, useState } from 'react';
import Highlight from '../../../shared/domains/ui/highlight/components/Highlight';
import highlightDatasMock from './highlight.mock';

const HightlightSample = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const onChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>): void =>
    setSearchTerm(event.target.value);

  return (
    <>
      <h2>Highlight</h2>
      <div>
        This component search elements by a text and highlight this text in your
        elements
      </div>
      <input type="text" value={searchTerm} onChange={onChangeSearchTerm}/>
  
      {highlightDatasMock
        .filter(text => text.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((text, index) => (
          <Highlight
            searchTerm={searchTerm}
            text={text}
            color="blue"
            key={`Highlight${index}`}
          />
        ))}
    </>
  );
};

export default HightlightSample;