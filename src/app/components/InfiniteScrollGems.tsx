"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { SkillGem } from "../_types/ISkillGem";
import SkillGemCard from "./SkillGemCard";
import CategoryButtons from "./CategoryButtons";

interface InfiniteScrollGemsProps {
  allGems: SkillGem[];
  searchGem: string;
}

const InfiniteScrollGems: React.FC<InfiniteScrollGemsProps> = ({
  allGems,
  searchGem,
}) => {
  const [visibleGems, setVisibleGems] = useState<SkillGem[]>([]);
  const [loadedCount, setLoadedCount] = useState(50);
  const gemsPerLoad = 50;
  const [loading] = useState(false);
  const [hasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const loadMoreGems = () => {
    if (loadedCount >= filteredGems.length) return;
    setVisibleGems(filteredGems.slice(0, loadedCount + gemsPerLoad));
    setLoadedCount((prevCount) => prevCount + gemsPerLoad);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1
    ) {
      loadMoreGems();
    }
  };
  const filteredGems = useMemo(() => {
    return allGems.filter((gem) => {
      const matchesCategory =
        selectedCategory === "All" ||
        gem.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = gem.name
        .toLowerCase()
        .includes(searchGem.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allGems, searchGem, selectedCategory]);

  useEffect(() => {
    setVisibleGems(filteredGems.slice(0, gemsPerLoad));
    setLoadedCount(gemsPerLoad);
  }, [filteredGems]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadedCount, filteredGems]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <CategoryButtons
        categories={["All", "Active", "Support", "Awakened", "Vaal"]}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {visibleGems.map((gem) => (
          <div key={gem.id}>
            <SkillGemCard gem={gem} />
          </div>
        ))}
        {loading && (
          <p className="text-center text-white mt-4">Loading more gems...</p>
        )}
        {!hasMore && (
          <p className="text-center text-gray-500 mt-4">No more gems to load</p>
        )}
      </div>
    </div>
  );
};

export default InfiniteScrollGems;
