import { React, useState, useEffect } from 'react';
import Header from './Header';

const Reports = () => {

    const [attendanceData, setAttendanceData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/attendance') // URL prilagodi backend ruti
            .then(response => response.json())
            .then(data => {
                // Grupiranje podataka po `subjectName`
                const groupedData = data.reduce((acc, record) => {
                    if (!acc[record.subjectName]) {
                        acc[record.subjectName] = [];
                    }
                    acc[record.subjectName].push(record);
                    return acc;
                }, {});

                setAttendanceData(groupedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Greška pri dohvaćanju podataka:', error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Izvještaji o prisutnosti</h2>

                {loading ? (
                    <p className="text-center text-gray-600">Učitavanje podataka...</p>
                ) : (
                    <div className="container mx-auto">
                        {Object.entries(attendanceData).map(([subjectName, students]) => (
                            <div key={subjectName} className="mb-8 p-6 bg-white rounded-lg shadow-md">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{subjectName}</h3>
                                <table className="min-w-full table-auto border-separate border-spacing-0">
                                    <thead>
                                        <tr className="bg-blue-600 text-white">
                                            <th className="py-3 px-6 text-left">Ime i Prezime</th>
                                            <th className="py-3 px-6 text-left">Korisničko ime</th>
                                            <th className="py-3 px-6 text-left">Datum i vrijeme</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student, index) => (
                                            <tr key={index} className="hover:bg-gray-100 border-b">
                                                <td className="py-3 px-6 text-gray-700">{student.firstName} {student.lastName}</td>
                                                <td className="py-3 px-6 text-gray-700">{student.username}</td>
                                                <td className="py-3 px-6 text-gray-700">{new Date(student.timestamp).toLocaleString()}</td> 
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Reports;
