import { FC } from 'react';

interface ClassNameProps {
  className?: string;
}

export default type FCWithClassName<Props = {}> = FC<ClassNameProps & Props>
