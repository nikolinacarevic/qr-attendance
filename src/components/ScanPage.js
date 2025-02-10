import React, { useState } from 'react';
import Header from './Header';  
import { FaBluetoothB, FaDownload } from 'react-icons/fa';

function BluetoothScanPage() {
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);

  const startScanning = async () => {
    setScanning(true);
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service'],
      });

      setDevices((prevDevices) => [...prevDevices, device]);
    } catch (error) {
      console.error('Greška prilikom skeniranja', error);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto mt-10 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Skeniraj uređaje</h2>

        <button
          onClick={startScanning}
          disabled={scanning}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg mb-4 hover:bg-blue-600 transition"
        >
          {scanning ? 'Skeniram...' : 'Pokreni skeniranje'}
        </button>

        <div className="w-full max-w-md">
          {devices.length > 0 ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Pronađeni uređaji</h3>
              <ul className="space-y-4">
                {devices.map((device, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-between"
                  >
                    <span>{device.name || 'Nepoznat uređaj'}</span>
                    <FaBluetoothB className="text-blue-500" />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-6">
              <p className="text-lg text-gray-600">Nema pronađenih uređaja.</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-gray-600 flex items-center cursor-pointer">
          <FaDownload className="mr-2" />
          <span>Preuzmi izvještaj</span>
        </div>
      </div>
    </div>
  );
}

export default BluetoothScanPage;
