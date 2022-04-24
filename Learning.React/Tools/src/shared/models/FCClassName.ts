import React from 'react';

interface ClassNameProps
{
	className?: string
}

export default type FCClassName<Props = {}> = React.FC<ClassNameProps & Props>