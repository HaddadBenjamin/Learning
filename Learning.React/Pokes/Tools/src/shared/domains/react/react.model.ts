import { FC } from 'react';

interface ClassNameProps {
  className?: string;
}

export default interface FCWithClassName<Props = {}> extends FC<ClassNameProps & Props> {}
