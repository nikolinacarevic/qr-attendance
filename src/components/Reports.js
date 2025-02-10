import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import Header from './Header';

const Reports = () => {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16"> 

                <div className="flex flex-col items-center mt-6"> 
                    <FaExclamationCircle className="text-6xl text-blue-600 mb-4" /> 
                    <p className="text-xl font-medium text-gray-700">Stranica u nastanku</p>
                </div>
            </div>
        </>
    );
};

export default Reports;
