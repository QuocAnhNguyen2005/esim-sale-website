import React from 'react';
import { Product } from '../../types/database';

interface EsimCardProps {
  product: any; // Sử dụng any tạm thời để khớp với mock data
  onSelect: (product: any) => void;
}

export default function EsimCard({ product, onSelect }: EsimCardProps) {
  return (
    <div 
      onClick={() => onSelect(product)}
      className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="text-5xl mb-4">{product.flag}</div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h4>
        <p className="text-gray-600 mb-5 text-sm">High-speed data. No roaming fees.</p>
      </div>
      <div className="flex items-end justify-between gap-3 pt-4 border-t border-gray-50">
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium text-xs uppercase tracking-wider">Starting at</span>
          <span className="text-2xl font-extrabold text-blue-700">{product.fromPrice}</span>
        </div>
        <button 
          className="bg-blue-100 text-blue-800 px-5 py-2.5 rounded-full font-bold hover:bg-blue-200 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product);
          }}
        >
          Shop
        </button>
      </div>
    </div>
  );
}
