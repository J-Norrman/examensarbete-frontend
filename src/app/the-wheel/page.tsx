'use client';

import React from 'react';
import { useWheelContext } from '../context/WheelContext';
import SkillGemCard from '../components/SkillGemCard';
import TheWheel from '../components/Wheel';


const WheelPage: React.FC = () => {
    const { wheelGems, removeGemFromWheel, clearWheel } = useWheelContext();
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className='flex flex-col items-center py-2'>
        <h1>Don't know what to league start?</h1>
        <h1>Let the wheel decide.</h1>
        </div>
        <TheWheel/>
        {wheelGems.length === 0 ? (
          <p className="flex flex-col items-center text-gray-400">No gems added to The Wheel.</p>
        ) : (
          <div>
            <div className="mb-4">
              <button
                onClick={clearWheel}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
              >
                Remove All Gems
              </button>
            </div> 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {wheelGems.map((gem) => (
                <div key={gem.id} className="relative">
                    <button
                    onClick={() => removeGemFromWheel(gem.id)}
                    className="absolute top-2 right-2 px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-600 z-20"
                  >
                    x
                  </button>
                  <SkillGemCard gem={gem} />
                  
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

export default WheelPage;