import React from 'react';
import './Loader.scss';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'; // Define prop for size
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium' }) => {
  const getSizeClassName = () => {
    switch (size) {
      case 'small':
        return 'loading loading-small';
      case 'large':
        return 'loading loading-large';
      default:
        return 'loading'; // medium size as default
    }
  };

  return (
    <div className="main-loading">
      <div className={getSizeClassName()} />
    </div>
  );
}

export default Loader;
