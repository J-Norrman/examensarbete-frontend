import React from 'react';
import ClientCurrencyPage from '../components/ClientCurrencyPage';

async function fetchCurrency() {
  const response = await fetch('http://localhost:8080/api/currency/latest',{ next: { revalidate: 720 } });
  if (!response.ok) {
    throw new Error('Failed to fetch currencies');
  }
  const data = await response.json();
  return data; 
}

export default async function CurrencyPage() {
  const allCurrencies = await fetchCurrency();
  console.log("allcurr: ",allCurrencies)

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Currency Exchange</h1>
      <ClientCurrencyPage allCurrencies={allCurrencies} />
    </main>
  );
}
