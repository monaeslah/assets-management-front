import React from "react";

interface CardProps {
  title: string;
  value: number;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-value">{value}</p>
    </div>
  );
};

export default Card;
