import * as React from 'react';

const vars = require('@styles/_config');

interface LightingProps {
  width?: number;
  height?: number;
  color?: string;
}

export const Lighting = ({ width = 20, height = 20, color = vars.black }:LightingProps) => {
  return <svg width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.657 10.333a1.317 1.317 0 0 0-1.1-.6h-2.64V3.511c0-.634-.44-1.18-1.055-1.308a1.317 1.317 0 0 0-1.48.784l-3.96 9.333c-.174.412-.132.885.112 1.26.245.373.66.598 1.103.598h2.64V20.4c-.001.634.44 1.18 1.055 1.308.615.127 1.233-.2 1.48-.784l3.96-9.333c.173-.412.13-.884-.115-1.258zM12.597 20.4v-7.556h-3.96l3.96-9.333v7.556h3.96l-3.96 9.333z" fill={color} fillRule="evenodd"/></svg>;
};