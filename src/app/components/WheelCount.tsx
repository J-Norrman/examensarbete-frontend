'use client';

import React from 'react';
import { useWheelContext } from '../context/WheelContext';

const WheelCount: React.FC = () => {
  const { wheelGems } = useWheelContext();
  return <span>{wheelGems.length}</span>;
};

export default WheelCount;