import React from "react";

type Props = {
  label: string;
  onClick?: () => void;
};

export const Button = ({ label, onClick }: Props) => {
  return <button onClick={onClick}>{label}</button>;
};
