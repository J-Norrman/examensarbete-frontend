import React from 'react';
import { SkillGem } from '../_types/ISkillGem';

interface GemCardProps {
    gem: SkillGem
}

const GemCard: React.FC<GemCardProps> = ({ gem }) => {
    return (
      <div className="relative flex items-center space-x-2 p-4 w-50 h-20 border border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group"
      >
        <img src={gem.icon} alt={gem.name} className="w-12 h-12" />
        <div>
          <p className="text-sm font-medium text-white">{gem.name}</p>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-28 hidden group-hover:flex flex-col 
          items-center w-96 p-4 bg-gray-800 text-white border border-gray-700 
          rounded-lg shadow-lg opacity-0 group-hover:opacity-95 pointer-events-none 
          group-hover:pointer-events-auto transition duration-200 z-10">
          <h3 className="text-md font-semibold">
            <a href={`https://www.poewiki.net/wiki/${encodeURIComponent(gem.name)}`}target="_blank" className="hover:cursor-pointer text-blue-400 hover:text-blue-200">{gem.name}</a>
          </h3>
          <img src={gem.icon} alt={gem.name} className="w-10 h-10 border-gray-300"/>
          {gem.explicitModifiers?.length > 0 && (
            <ul className="mt-2 text-sm list-disc pl-5">
              {gem.explicitModifiers.map((mod, index) => (
                <li key={index}>{mod.text}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };
export default GemCard;