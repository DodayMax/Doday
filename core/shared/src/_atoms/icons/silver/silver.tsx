import * as React from 'react';
import { createSvgIcon } from '../createIcon';
import { config } from '@doday/lib';

export const Silver = createSvgIcon(
  <>
    <circle
      stroke={config.colors.black}
      strokeWidth="1.5"
      fill="#F7F7F7"
      cx="10"
      cy="10"
      r="10"
    />
    <path d="M11.24 16.57a.277.277 0 0 1-.345.061L3.47 12.428a.264.264 0 0 1-.1-.364l2.444-4.15a.275.275 0 0 1 .37-.098L8.809 9.3l2.783-4.723a.275.275 0 0 1 .37-.098l4.57 2.587c.13.073.174.235.1.362l-5.353 9.093a.25.25 0 0 1-.038.049z" />
  </>,
  'Silver'
);
