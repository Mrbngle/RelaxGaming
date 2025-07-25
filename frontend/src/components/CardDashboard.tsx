
import React from 'react';

interface CardDashboardProps {
  title: string;
  children: React.ReactNode;
}

const CardDashboard: React.FC<CardDashboardProps> = ({ title, children }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">{title}</div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default CardDashboard;
