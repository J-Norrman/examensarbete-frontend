'use client';

import React, { useEffect, useState } from 'react';
import { SkillGem } from '../_types/ISkillGem';
import SkillGemCard from './SkillGemCard';

interface InfiniteScrollGemsProps {
  initialGems: SkillGem[];
}

const InfiniteScrollGems: React.FC<InfiniteScrollGemsProps> = ({ initialGems }) => {
  const [gems, setGems] = useState<SkillGem[]>(initialGems);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreGems = async (page: number) => {
    if (loading) return;    
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/skill-gems/get-all?page=${page}&size=50`);
      if (!res.ok) {
        throw new Error(`Failed to fetch gems: ${res.statusText}`);
      }
      const data = await res.json();
      if (data.content && data.content.length > 0) {
        setGems((prevGems) => [...prevGems, ...data.content]);
        if (!data.hasNext) {
          setHasMore(false); 
        }
      } else {
        setHasMore(false); 
      }
    } catch (error) {
      console.error('Error fetching more gems:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (!hasMore || window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 0) {
      fetchMoreGems(page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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