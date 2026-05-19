import React, { useState } from 'react';

type Tab = 'local' | 'regional' | 'global';

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState<Tab>('local');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full bg-gradient-to-br from-indigo-900 to-purple-800 text-white py-20 px-4 flex flex-col items-center">
      <div className="max-w-3xl w-full text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Stay Connected, Anywhere.
        </h1>
        <p className="text-lg md:text-xl text-indigo-200">
          Instant eSIMs for 200+ countries and regions. No roaming fees.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden text-gray-900">
        {/* Search Bar */}
        <div className="relative p-2">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="w-full pl-14 pr-6 py-4 text-lg rounded-xl border-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 outline-none transition-all placeholder-gray-400"
            placeholder="Where do you want to go?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="flex border-t border-gray-100 bg-white">
          <button
            onClick={() => setActiveTab('local')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 ${
              activeTab === 'local' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Local eSIMs
          </button>
          <button
            onClick={() => setActiveTab('regional')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 ${
              activeTab === 'regional' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Regional eSIMs
          </button>
          <button
            onClick={() => setActiveTab('global')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 ${
              activeTab === 'global' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Global eSIMs
          </button>
        </div>
      </div>
    </div>
  );
}
