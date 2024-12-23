'use client';

import React, { useState } from 'react';
import { useWheelContext } from '../context/WheelContext';
import { motion } from 'framer-motion';

const TheWheel: React.FC = () => {
  const { wheelGems } = useWheelContext();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedGem, setSelectedGem] = useState<string | null>(null);

  const spinWheel = () => {
    if (wheelGems.length === 0) return;

  const degreesPerSegment = 360 / wheelGems.length;
  const randomIndex = Math.floor(Math.random() * wheelGems.length);
  const randomPartialRotation = Math.random() * 123; 
  const randomFullRotations = Math.floor(Math.random() * 5) + 3; 

  const targetRotation =
    rotation + 
    randomFullRotations * 360 + 
    randomPartialRotation + 
    randomIndex * degreesPerSegment; 

  setRotation(targetRotation);
  setIsSpinning(true);

    setTimeout(() => {
      setSelectedGem(wheelGems[randomIndex].name); 
      setIsSpinning(false);
    }, 4000);
  };
  if (wheelGems.length === 0) {
    return ;
  }
  return (
    <div className="flex flex-col items-center space-y-6">
      
      <div className="relative w-80 h-80 rounded-full border-4 border-gray-700 overflow-hidden bg-gray-800"> 
        <motion.div className="absolute w-full h-full rounded-full"
          animate={{
            rotate: rotation,
          }}
          transition={{
            duration: 4,
            ease: 'easeOut',
          }}
        >
          {wheelGems.map((gem, index) => {
            const segmentAngle = 360 / wheelGems.length;
            return (
              <div key={gem.id} className="absolute w-full h-full flex items-center justify-center" 
              style={{
                  transform: `rotate(${index * segmentAngle}deg) translateY(-40%)`,
                }}
              >
                <div>
                  <img src={gem.icon} alt={gem.name} className="w-10 h-10 mx-auto" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
        onClick={spinWheel}
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
      {selectedGem && (
        <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Winner:</h3>
          <div className="flex items-center space-x-4">
            <img
              src={wheelGems.find((gem) => gem.name === selectedGem)?.icon}
              alt={selectedGem}
              className="w-12 h-12"
            />
            <p>{selectedGem}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheWheel;
