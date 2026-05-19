import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import InstallModal from '../components/esim/InstallModal';

export default function DashboardPage() {
  // Mock data for UI demonstration
  const mockEsims = [
    {
      id: '1',
      productName: 'Japan 5GB 7 Days',
      countryName: 'Japan',
      flagEmoji: '🇯🇵',
      status: 'AVAILABLE',
      iccid: '',
      created_at: new Date().toISOString(),
      qr_code_url: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=LPA:1$smdp.io$activation_code',
      lpa_string: 'LPA:1$smdp.io$activation_code_here',
      vendor_id: 'v1',
      product_id: 'p1',
      updated_at: new Date().toISOString()
    }
  ] as any[];

  const [selectedEsim, setSelectedEsim] = React.useState<any | null>(null);

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-5xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My eSIMs</h1>
        <p className="text-gray-500 mb-8">Manage and install your purchased eSIMs.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEsims.map((esim) => (
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
                  className="w-full py-3 rounded-xl font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                >
                  Install eSIM
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedEsim && (
          <InstallModal esim={selectedEsim} onClose={() => setSelectedEsim(null)} />
        )}
      </main>
      <Footer />
    </div>
  );
}
