import * as React from 'react';

export const Button = ({ text, ...props }) => {
  return (
    <button className="button" {...props}>{text}</button>
  );
}