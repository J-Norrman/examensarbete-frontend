"use client";

import React, { createContext, useContext, useState } from "react";
import { SkillGem } from "../_types/ISkillGem";

interface WheelContextProps {
  wheelGems: SkillGem[];
  addGemToWheel: (gem: SkillGem) => void;
  removeGemFromWheel: (id: number) => void;
  clearWheel: () => void;
}
const WheelContext = createContext<WheelContextProps | undefined>(undefined);

export const WheelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wheelGems, setWheelGems] = useState<SkillGem[]>([]);

  const addGemToWheel = (gem: SkillGem) => {
    if (!wheelGems.find((existingGem) => existingGem.id === gem.id)) {
      setWheelGems((prev) => [...prev, gem]);
    }
  };
  const removeGemFromWheel = (id: number) => {
    setWheelGems((prevGems) => prevGems.filter((gem) => gem.id !== id));
  };

  const clearWheel = () => {
    setWheelGems([]);
  };
  return (
    <WheelContext.Provider
      value={{ wheelGems, addGemToWheel, removeGemFromWheel, clearWheel }}
    >
      {children}
    </WheelContext.Provider>
  );
};

export const useWheelContext = (): WheelContextProps => {
  const context = useContext(WheelContext);
  if (!context) {
    throw new Error("useWheelContext must be used within a WheelProvider");
  }
  return context;
};
