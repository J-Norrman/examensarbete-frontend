import React from 'react';
import InfiniteScrollGems from '../components/InfiniteScrollGems';
import { SkillGem } from '../_types/ISkillGem';

async function fetchInitialGems(page: number, size: number): Promise<SkillGem[]> {
  const response = await fetch(`http://localhost:8080/api/skill-gems/get-all?page=${page}&size=${size}`,{ next: { revalidate: 720 } });

  if (!response.ok) {
    throw new Error('Failed to fetch initial gems');
  }

  const data = await response.json();
  console.log("get gems from page: ",{page})
  return data.content;
}

export default async function GemsPage() {
  const initialGems = await fetchInitialGems(0, 50);
 

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className='flex flex-auto justify-evenly'>
      <h1 className="text-2xl font-bold mb-6 text-white">Skill Gems</h1> 
    
      </div>
      <InfiniteScrollGems initialGems={initialGems} />      
    </main>
  );
}