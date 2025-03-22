import React from 'react';
import './CustomCard.scss';

interface CardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
  selected?: boolean;
  onClick: () => void;
}

const CustomCard: React.FC<CardProps> = ({ title, description, icon, selected, className, onClick }) => {
  return (
    <div
      className={`custom-card ${className && className} ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="card-icon">
        <img src={icon} alt="card-icon" />
      </div>
      <div className="card-content">
        <div className={`${selected ? "selected-title" : "card-titile"}`}>{title}</div>
        <div className="card-description">{description}</div>
      </div>
    </div>
  );
};

export default CustomCard;
