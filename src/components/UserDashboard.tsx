import React, { useState } from 'react';
import { EsimProfile } from '../types/database';
import InstallModal from './InstallModal';

interface UserDashboardProps {
  esims: (EsimProfile & { productName: string; countryName: string; flagEmoji: string })[];
}

export default function UserDashboard({ esims }: UserDashboardProps) {
  const [selectedEsim, setSelectedEsim] = useState<EsimProfile | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
      case 'ASSIGNED':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-1 rounded-full">Not Installed</span>;
      case 'ACTIVATED':
        return <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">Active</span>;
      case 'EXPIRED':
        return <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full">Expired</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">My eSIMs</h1>
      <p className="text-gray-500 mb-8">Manage and install your purchased eSIMs.</p>

      {esims.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No eSIMs found</h3>
          <p className="text-gray-500">You haven't purchased any eSIMs yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {esims.map((esim) => (
            <div key={esim.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{esim.flagEmoji}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{esim.countryName}</h3>
                    <p className="text-sm text-gray-500">{esim.productName}</p>
                  </div>
                </div>
                {getStatusBadge(esim.status)}
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">ICCID</span>
                  <span className="font-mono text-gray-900 font-medium truncate ml-4">{esim.iccid || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Purchased</span>
                  <span className="text-gray-900 font-medium">
                    {new Date(esim.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-auto">
                <button
                  onClick={() => setSelectedEsim(esim)}
                  disabled={esim.status === 'EXPIRED'}
                  className={`w-full py-3 rounded-xl font-medium transition-colors ${
                    esim.status === 'EXPIRED' 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                  }`}
                >
                  {esim.status === 'ACTIVATED' ? 'View Details' : 'Install eSIM'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedEsim && (
        <InstallModal esim={selectedEsim} onClose={() => setSelectedEsim(null)} />
      )}
    </div>
  );
}
