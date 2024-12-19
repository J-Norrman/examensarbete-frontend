'use client';

import React, { useState } from 'react';
import InfiniteScrollGems from './InfiniteScrollGems';
import SearchBar from './SearchBar';
import { SkillGem } from '../_types/ISkillGem';

interface ClientGemPageProps {
  allGems: SkillGem[];
}

const ClientGemPage: React.FC<ClientGemPageProps> = ({ allGems }) => {
  const [searchGem, setSearchGem] = useState('');

  return (
    <>
      <SearchBar searchGem={searchGem} onSearchChange={setSearchGem} />
      <InfiniteScrollGems allGems={allGems} searchGem={searchGem} />
    </>
  );
};

export default ClientGemPage;