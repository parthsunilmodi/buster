import React from 'react';
import { ISVGType } from '../../assets/svg/SVGType';
import './CustomCard.scss';

interface CardProps {
  title: string;
  description: string;
  icon: (props: ISVGType) => React.JSX.Element;
  selected: boolean;
  onClick: () => void;
}

const CustomCard: React.FC<CardProps> = ({ title, description, icon, selected, onClick }) => {
  const SvgIcon = icon;
  return (
    <div className={`custom-card ${selected ? 'selected' : ''}`} onClick={onClick}>
      <div className="card-icon">
        <SvgIcon color={selected ? '#1E848D' : '#8C8C8C'} circleFill={selected ? '#1E848D' : 'white'} />
      </div>
      <div className="card-content">
        <div className={`${selected ? 'selected-title' : 'card-titile'}`}>{title}</div>
        <div className="card-description">{description}</div>
      </div>
    </div>
  );
};

export default CustomCard;
