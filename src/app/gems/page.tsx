import React from 'react';
import Link from 'next/link';
import { SkillGem } from '../_types/ISkillGem';
import Card from '../components/SkillGemCard';


const API_URL = 'http://localhost:8080/api/skill-gems/get-all?page=0&size=50';

async function fetchGems() {
  const response = await fetch(API_URL, { cache: 'no-store' }); 
  if (!response.ok) {
    throw new Error('Failed to fetch gems');
  }
  return response.json();
}

export default async function GemsPage() {
  const data = await fetchGems();
  const gems = data.content || data; 

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
  <div>
    <h2 className="text-2xl font-bold mb-6 text-white">Skill Gems</h2>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
    {gems.map((gem) => (
      <div
        key={gem.id}
        className="relative flex items-center space-x-2 p-2 border border-gray-700 rounded-lg 
        shadow-sm hover:shadow-md transition-shadow duration-200 group "
      >
        {/* Icon */}
        <img src={gem.icon} alt={gem.name} className="w-12 h-12" />
        {/* Name */}
        <div>
          <p className="text-sm font-medium text-white">{gem.name}</p>
        </div>

        {/* Hover Card */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 -top-28 hidden group-hover:flex flex-col 
          items-center w-96 p-4 bg-gray-800 text-white border border-gray-700 
          rounded-lg shadow-lg opacity-0 group-hover:opacity-95 pointer-events-none 
          group-hover:pointer-events-auto transition duration-200 z-10"
        >
          <h3 className="text-md font-semibold">{gem.name}</h3>
          <img
            src={gem.icon}
            alt={gem.name}
            className="w-10 h-10 border-gray-300"
          />
          {gem.explicitModifiers?.length > 0 && (
            <ul className="mt-2 text-sm list-disc pl-5">
              {gem.explicitModifiers.map((mod, index) => (
                <li key={index}>{mod.text}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      ))}
    </div>
  </div>
  );
}