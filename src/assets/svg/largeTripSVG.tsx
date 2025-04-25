import React from 'react';
import { ISVGType } from './SVGType';

const LargeTripSVG = (props: ISVGType) => {
  const { width = 51, height = 26, color = '#8C8C8C', circleFill = 'white' } = props;

  return (
    <svg width={width} height={height} viewBox="0 0 51 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_203_921)">
        <path
          d="M20.6504 7.34924L24.6855 11.3844L20.6504 15.4196"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path d="M10.7936 11.1641L23.9889 11.1641" stroke={color} stroke-width="2" />
        <line x1="4.55823" y1="6.88184" x2="4.55823" y2="20.157" stroke={color} stroke-width="2" />
        <circle cx="4.77615" cy="4.56778" r="3.01907" fill={circleFill} stroke={color} stroke-width="2" />
        <circle cx="39.3551" cy="10.946" r="8.42725" stroke={color} stroke-width="2" />
        <line x1="39.3198" y1="9.73676" x2="39.3198" y2="16.0085" stroke={color} stroke-width="2" />
        <circle cx="39.1925" cy="7.00989" r="1.3634" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0_203_921">
          <rect width="50" height="26" fill="white" transform="translate(0.594238)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LargeTripSVG;
