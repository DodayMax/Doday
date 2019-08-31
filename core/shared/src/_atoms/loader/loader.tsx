import * as React from 'react';

export const Loader = props => (
  <svg
    width="40"
    height="30"
    viewBox="0 0 40 30"
    xmlns="http://www.w3.org/2000/svg"
    fill={props.color}
  >
    <circle cx="6" cy="6" r="3">
      <animate
        attributeName="r"
        from="6"
        to="6"
        begin="0s"
        dur="0.8s"
        values="6;3;6"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="fillOpacity"
        from="1"
        to="1"
        begin="0s"
        dur="0.8s"
        values="1;.5;1"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="20" cy="6" r="3" fillOpacity="0.3">
      <animate
        attributeName="r"
        from="3"
        to="3"
        begin="0s"
        dur="0.8s"
        values="3;6;3"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="fillOpacity"
        from="0.5"
        to="0.5"
        begin="0s"
        dur="0.8s"
        values=".5;1;.5"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="34" cy="6" r="3">
      <animate
        attributeName="r"
        from="6"
        to="6"
        begin="0s"
        dur="0.8s"
        values="6;3;6"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="fillOpacity"
        from="1"
        to="1"
        begin="0s"
        dur="0.8s"
        values="1;.5;1"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);
