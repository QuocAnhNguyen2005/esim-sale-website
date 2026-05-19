import React from 'react';
import HeroSearch from '../components/HeroSearch';
import EsimCard from '../components/EsimCard';
import { Product } from '../types/database';

export default function HomePage() {
  const dummyProduct: Product = {
    id: '1',
    vendor_id: 'v1',
    name: 'Japan 5GB 7 Days',
    country_code: 'JP',
    data_limit_gb: 5,
    duration_days: 7,
    price: 9.99,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSearch />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <EsimCard 
            product={dummyProduct} 
            countryName="Japan" 
            flagEmoji="🇯🇵" 
            onSelect={(p) => console.log('Selected', p)} 
          />
          {/* Thêm các EsimCard khác ở đây */}
        </div>
      </div>
    </div>
  );
}
