import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { FaBluetoothB, FaDownload } from 'react-icons/fa';

function ScanPage() {
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subjectName = queryParams.get('subjectName') || 'Nepoznat predmet';

  const knownStudent = {
    name: 'Nikolina Carević',
    bluetoothId: '5WJUVG/lk720wXwUVDKVpQ=='
  };

  const startScanning = async () => {
    setScanning(true);
    setDevices([]);

    try {
      const timeout = setTimeout(() => {
        setScanning(false);
        alert("Skeniranje završeno.");
      }, 10000);

      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service'],
      });

      const deviceName = device.name || 'Nepoznati uređaj';
      const deviceLabel = device.id === knownStudent.bluetoothId ? knownStudent.name : deviceName;

      setDevices((prevDevices) => [
        ...prevDevices,
        { id: device.id, name: deviceLabel }
      ]);

      clearTimeout(timeout);
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

        <h2 className="text-2xl font-bold text-left text-gray-800 w-full max-w-md self-start ml-3">
          {subjectName}
        </h2>
        <h4 className="text-sm text-gray-400 w-full max-w-md self-start ml-2.5 mb-4">
          Prisutnost na predavanju
        </h4>


        <button
          onClick={startScanning}
          disabled={scanning}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg mt-20 mb-10 hover:bg-blue-600 transition"
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
                    <div>
                      <span>{device.name}</span>
                      <p className="text-sm text-gray-500 mt-2">Bluetooth ID: {device.id}</p>
                    </div>
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

export default ScanPage;
