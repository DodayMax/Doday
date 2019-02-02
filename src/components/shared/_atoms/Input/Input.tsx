import * as React from 'react';

interface InputProps {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ value, onChange, ...props }: InputProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}