'use client';

import React, { useEffect, useState } from 'react';
import { SkillGem } from '../_types/ISkillGem';
import SkillGemCard from './SkillGemCard';

interface InfiniteScrollGemsProps {
  initialGems: SkillGem[];
}

const InfiniteScrollGems: React.FC<InfiniteScrollGemsProps> = ({ initialGems }) => {
  const [gems, setGems] = useState<SkillGem[]>(initialGems);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMoreGems = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/skill-gems/get-all?page=${page}&size=50`);
      const data = await res.json();
      setGems((prevGems) => [...prevGems, ...data.content]);
    } catch (error) {
      console.error('Error fetching more gems:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchMoreGems(page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {gems.map((gem) => (
          <div>
          <SkillGemCard key={gem.id} gem={gem} />
          </div>       
      ))}
      {loading && <p className="text-center text-white mt-4">Loading more gems...</p>}
    </div>
  );
};

export default InfiniteScrollGems;