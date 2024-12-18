'use client';

import React, { useState } from 'react';
import InfiniteScrollGems from './InfiniteScrollGems';
import SearchBar from './SearchBar';
import { SkillGem } from '../_types/ISkillGem';

interface ClientGemPageProps {
  initialGems: SkillGem[];
}

const ClientGemPage: React.FC<ClientGemPageProps> = ({ initialGems }) => {
  const [searchGem, setSearchGem] = useState('');

  return (
    <>
      <SearchBar searchGem={searchGem} onSearchChange={setSearchGem} />
      <InfiniteScrollGems initialGems={initialGems} searchGem={searchGem} />
    </>
  );
};

export default ClientGemPage;