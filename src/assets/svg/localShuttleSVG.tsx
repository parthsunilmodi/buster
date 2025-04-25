import React from 'react';
import { ISVGType } from './SVGType';

const LocalShuttleSVG = (props: ISVGType) => {
  const { width = 51, height = 26, color = '#8C8C8C', circleFill = 'white' } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 51 26" fill="none">
      <path
        d="M16.7959 24.8669L12.7607 20.8318L16.7959 16.7966"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M37.9778 11.3947V15.0521C37.9778 18.3658 35.2915 21.0521 31.9778 21.0521H13.5688"
        stroke={color}
        stroke-width="2"
      />
      <path
        d="M31.7329 1.39471L35.7681 5.42987L31.7329 9.46503"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.7607 14.8669V11.2095C12.7607 7.89582 15.447 5.20953 18.7607 5.20953H34.6865"
        stroke={color}
        stroke-width="2"
      />
      <line x1="46.0355" y1="7.88171" x2="46.0355" y2="21.1569" stroke={color} stroke-width="2" />
      <circle cx="46.2534" cy="5.56766" r="3.01907" fill={circleFill} stroke={color} stroke-width="2" />
      <line x1="4.55823" y1="7.88184" x2="4.55823" y2="21.157" stroke={color} stroke-width="2" />
      <circle cx="4.77615" cy="5.56778" r="3.01907" fill={circleFill} stroke={color} stroke-width="2" />
    </svg>
  );
};

export default LocalShuttleSVG;
