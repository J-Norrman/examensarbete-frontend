import React from 'react';

interface CurrencyCardProps {
  name: string;
  icon: string;
  chaosEquivalent: number;
  chaosIconUrl: string;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({ name, icon, chaosEquivalent, chaosIconUrl }) => {
  return (
    <div className="p-4 border border-gray-700 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img src={icon} alt={name} className="w-12 h-12" />
        <p className="text-lg font-bold text-white">{name}</p>
      </div>
      <div className="flex items-center mt-4">
        <img src={chaosIconUrl} alt="Chaos Orb" className="w-6 h-6" />
        <p className="ml-2 text-white">{chaosEquivalent.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CurrencyCard;
