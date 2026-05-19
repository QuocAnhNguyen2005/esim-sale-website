import React from 'react';
import { Product } from '../types/database';

interface EsimCardProps {
  product: Product;
  countryName: string;
  flagEmoji: string;
  onSelect: (product: Product) => void;
}

export default function EsimCard({ product, countryName, flagEmoji, onSelect }: EsimCardProps) {
  const dataLabel = product.data_limit_gb ? `${product.data_limit_gb} GB` : 'Unlimited';

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer" onClick={() => onSelect(product)}>
      {/* Header: Flag and Country */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{flagEmoji}</span>
          <h3 className="font-bold text-gray-900 text-lg">{countryName}</h3>
        </div>
      </div>

      {/* Details: Data and Validity */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col p-3 bg-gray-50 rounded-xl">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Data</span>
          <span className="font-semibold text-gray-900">{dataLabel}</span>
        </div>
        <div className="flex flex-col p-3 bg-gray-50 rounded-xl">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Validity</span>
          <span className="font-semibold text-gray-900">{product.duration_days} Days</span>
        </div>
      </div>

      {/* Footer: Price and Button */}
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">Price</span>
          <span className="font-bold text-xl text-indigo-600">${product.price.toFixed(2)}</span>
        </div>
        <button 
          className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium group-hover:bg-indigo-600 transition-colors duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product);
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
