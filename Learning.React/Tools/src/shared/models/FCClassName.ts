import React from "react";

interface ClassNameProps
{
	className?: string
}

export default interface FCClassName<Props = {}>  extends React.FC<ClassNameProps & Props> { }