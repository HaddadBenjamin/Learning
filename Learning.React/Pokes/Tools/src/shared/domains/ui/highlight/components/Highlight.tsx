import {FC} from "react";
import {removeHtmlTags} from "../../../../utils/removeHtmlTags";

interface Props
{
  text : string
  searchTerm : string
  color?: string
}

export const Highlight : FC<Props> = ({text, searchTerm, color}) =>
{
  const newText = removeHtmlTags(text)
    .replaceAll(new RegExp(searchTerm, 'ig'), oldText => `<span style="color :${color ?? 'red'}">${oldText}</span>`)

  return <div dangerouslySetInnerHTML={{__html: newText}}></div>
}