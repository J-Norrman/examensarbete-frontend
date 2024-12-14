import React from 'react';
import Link from 'next/link';
/*import './gems.css';*/

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
    <div className="">
      <h2 className="">Skill Gems</h2>
      <div className="grid lg:grid-cols-10 gap-6">
        {gems.map((gem: any) => (
          <div key={gem.id} className="relative group">
            {/* Gem Icon */}
            <img
              src={gem.icon}
              alt={gem.name}
              className=""
            />
            <p className="text-center mt-2 text-sm font-medium">{gem.name}</p>

            {/* Tooltip */}
            <div className="">
              {/* <h3 className="">{gem.name}</h3> */}
              <p className="">Category: {gem.category}</p>
              <ul className="text-sm list-disc">
                {gem.explicitModifiers.map((mod: any, index: number) => (
                  <li key={index}>{mod.text}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}