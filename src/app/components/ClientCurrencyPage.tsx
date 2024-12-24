"use client";

import React, { useState } from "react";
import { Currency } from "../_types/ICurrency";
import CurrencyCard from "./CurrencyCard";
import SearchBar from "./SearchBar";

interface ClientCurrencyDisplayProps {
  allCurrencies: Currency[];
}

const ClientCurrencyPage: React.FC<ClientCurrencyDisplayProps> = ({
  allCurrencies,
}) => {
  const [searchCurrency, setSearchCurrency] = useState("");

  if (!allCurrencies || allCurrencies.length === 0) {
    return <p className="text-white">No currencies available.</p>;
  }

  const chaosIconUrl =
    "https://www.poewiki.net/images/9/9c/Chaos_Orb_inventory_icon.png";
  const divineIconUrl =
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lNb2RWYWx1ZXMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/e1a54ff97d/CurrencyModValues.png";

  const divineOrb = allCurrencies.find(
    (currency) => currency.currencyTypeName === "Divine Orb"
  );
  const divineChaosEquivalent = divineOrb ? divineOrb.chaosEquivalent : 1;

  const filteredCurrencies = allCurrencies
    .filter((currency) =>
      currency.currencyTypeName
        .toLowerCase()
        .includes(searchCurrency.toLowerCase())
    )
    .sort((a, b) => b.chaosEquivalent - a.chaosEquivalent);

  return (
    <div className="space-y-8">
      <SearchBar
        searchValue={searchCurrency}
        placeholder="Search currencies..."
        onSearchChange={setSearchCurrency}
      />
      {divineOrb && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center text-center space-x-4">
          <img
            src={divineOrb.icon}
            alt={divineOrb.currencyTypeName}
            className="w-12 h-12"
          />
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-bold text-white">
              {divineOrb.currencyTypeName}
            </h2>
            <p className="text-md text-white flex items-center">
              <span>
                Chaos Equivalent: {divineOrb.chaosEquivalent.toFixed(2)}
              </span>
              <img
                src="https://www.poewiki.net/images/9/9c/Chaos_Orb_inventory_icon.png"
                alt="Chaos Orb"
                className="w-5 h-5 ml-2"
              />
            </p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCurrencies.map((currency) => {
          const isAboveDivine =
            currency.chaosEquivalent > divineChaosEquivalent;
          const equivalentValue = isAboveDivine
            ? parseFloat(
                (currency.chaosEquivalent / divineChaosEquivalent).toFixed(2)
              )
            : currency.chaosEquivalent;
          const displayIconUrl = isAboveDivine ? divineIconUrl : chaosIconUrl;

          return (
            <CurrencyCard
              key={currency.currencyId}
              name={currency.currencyTypeName}
              icon={currency.icon}
              chaosEquivalent={equivalentValue}
              chaosIconUrl={displayIconUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClientCurrencyPage;
