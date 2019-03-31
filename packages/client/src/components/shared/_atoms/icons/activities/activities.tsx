import * as React from 'react';

const vars = require('@styles/_config.scss');

interface ActivitiesProps {
  width?: number;
  height?: number;
  color?: string;
}

export const Activities = ({
  width = 20,
  height = 20,
  color = vars.black,
}: ActivitiesProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.098 2.178c-5.4 0-9.778 4.377-9.778 9.778 0 5.4 4.378 9.777 9.778 9.777s9.778-4.377 9.778-9.777c0-5.4-4.378-9.778-9.778-9.778zm8.422 9.333h-1.778a6.667 6.667 0 0 0-6.2-6.2V3.533a8.444 8.444 0 0 1 7.978 7.978zm-8.422 5.778a5.333 5.333 0 1 1 0-10.667 5.333 5.333 0 0 1 0 10.667zm-8.445-5.333A8.444 8.444 0 0 1 11.21 3.56v1.778a6.667 6.667 0 1 0 4.724 12.044l1.271 1.271a8.444 8.444 0 0 1-13.55-6.697zM18.2 17.782l-1.258-1.258a6.64 6.64 0 0 0 1.778-3.68h1.778a8.409 8.409 0 0 1-2.298 4.938z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};
