'use client';

import React, { useEffect, useState, useRef } from 'react';
import { SkillGem } from '../_types/ISkillGem';
import SkillGemCard from './SkillGemCard';
import CategoryButtons from './CategoryButtons';

interface InfiniteScrollGemsProps {
  initialGems: SkillGem[];
  searchGem: string;
}

const InfiniteScrollGems: React.FC<InfiniteScrollGemsProps> = ({ initialGems, searchGem}) => {
  const [gems, setGems] = useState<SkillGem[]>(initialGems);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const fetchMoreGems = async (page: number) => {
    if (loading) return;    
    setLoading(true);
    try {
      console.log("get gems from page: ",{page})
      const response = await fetch(`http://localhost:8080/api/skill-gems/get-all?page=${page}&size=50`,{next:{revalidate: 360}});
      if (!response.ok) {
        throw new Error(`Failed to fetch gems: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.content && data.content.length > 0) {
        setGems((prevGems) => {
          const existingIds = new Set(prevGems.map((gem) => gem.id));
          const newGems = data.content.filter((gem: SkillGem) => !existingIds.has(gem.id));
          return [...prevGems, ...newGems];
        });
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
    if (loading || !hasMore) return;

    const bottomReached = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1
    if (bottomReached) {
      setLoading(true)
      fetchMoreGems(page + 1).then(() => {
        setPage((prevPage) => prevPage + 1);
      })
    
    }
  };
  const filteredGems = gems.filter((gem) => {
    const matchesCategory = selectedCategory === 'All' || gem.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = gem.name.toLowerCase().includes(searchGem.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  
  useEffect(() => {
    const onScroll = () => handleScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading,hasMore,page]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <CategoryButtons
        categories={['All', 'Active', 'Support', 'Awakened', 'Vaal']}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {filteredGems.map((gem) => (
          <div key={gem.id}>
            <SkillGemCard gem={gem} />
          </div>
        ))}
        {loading && <p className="text-center text-white mt-4">Loading more gems...</p>}
        {!hasMore && <p className="text-center text-gray-500 mt-4">No more gems to load</p>}
      </div>
    </div>
  );
};

export default InfiniteScrollGems;