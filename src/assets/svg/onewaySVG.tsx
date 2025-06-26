import React from 'react';
import { ISVGType } from './SVGType';

const OneWayTripSVG = (props: ISVGType) => {
  const { width = 52, height = 26, color = '#8C8C8C' } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 44 22" fill="none">
      <path
        d="M26.9651 1.88928L31.0002 5.92444L26.9651 9.95959"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.8236 5.7041L30.1719 5.7041" stroke={color} strokeWidth="2" />
      <path
        d="M16.8586 12.42L12.8235 16.4552L16.8586 20.4904"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M30.5599 16.2349L13.2116 16.2349" stroke={color} strokeWidth="2" />
      <line x1="39.4802" y1="7.88184" x2="39.4802" y2="21.157" stroke={color} strokeWidth="2" />
      <circle cx="39.6982" cy="5.56778" r="3.01907" fill="white" stroke={color} strokeWidth="2" />
      <line x1="4.55835" y1="7.88184" x2="4.55835" y2="21.157" stroke={color} strokeWidth="2" />
      <circle cx="4.77628" cy="5.56778" r="3.01907" fill="white" stroke={color} strokeWidth="2" />
    </svg>
  );
};

export default OneWayTripSVG;
