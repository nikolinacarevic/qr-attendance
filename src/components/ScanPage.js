import React, { useState } from 'react';
import Header from './Header';
import { FaQrcode } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import { useLocation } from 'react-router-dom';

function ScanPage() {
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subjectName = queryParams.get('subjectName') || 'Nepoznat predmet';
  const attendanceUrl = `${window.location.origin}/attend?sessionId=${sessionId}&subjectName=${subjectName}`;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto mt-10 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{subjectName}</h2>
        <p className="text-lg text-gray-600 mb-8">
          Skenirajte QR kod za evidenciju prisutnosti
        </p>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <QRCodeSVG value={attendanceUrl} size={250} />
          <div className="mt-4 text-gray-500 flex items-center">
            <FaQrcode className="mr-2" />
            <span>Session ID: {sessionId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScanPage;
