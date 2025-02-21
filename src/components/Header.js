import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function AttendPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('sessionId');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);

  const students = [
    { username: 'nikolinacarevic', password: 'ime123', firstName: 'Nikolina', lastName: 'Carević' },
    { username: 'marijacubic', password: 'ime123', firstName: 'Marija', lastName: 'Ćubić' },
    { username: 'katarinabotic', password: 'ime123', firstName: 'Katarina', lastName: 'Botić' },
    { username: 'paulabonic', password: 'ime123', firstName: 'Paula', lastName: 'Bonić' },
  ];

  useEffect(() => {
    const storedAttendanceList = JSON.parse(localStorage.getItem('attendanceList')) || [];
    setAttendanceList(storedAttendanceList);
  }, []);

  useEffect(() => {
    if (sessionId && isLoggedIn) {
      alert('Uspješno ste evidentirani na nastavi!');
    }
  }, [sessionId, isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();

    const student = students.find(
      (student) => student.username === username && student.password === password
    );

    if (student) {
      const studentName = `${student.firstName} ${student.lastName}`;

      // Ako student nije već na listi, dodajemo ga
      if (!attendanceList.includes(studentName)) {
        const updatedAttendanceList = [...attendanceList, studentName];
        setAttendanceList(updatedAttendanceList);
        localStorage.setItem('attendanceList', JSON.stringify(updatedAttendanceList));
      }

      // Uvijek dopuštamo prijavu, bez obzira na listu prisutnih
      setShowLoginPopup(false);
      setIsLoggedIn(true);
    } else {
      setErrorMessage('Pogrešno korisničko ime ili lozinka!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Pop-up za prijavu */}
      {showLoginPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-black mb-6">Prijava studenta</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-black font-semibold">Korisničko ime:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-black font-semibold">Lozinka:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Prijavi se
              </button>
            </form>
            {errorMessage && <p className="mt-4 text-center text-red-500">{errorMessage}</p>}
          </div>
        </div>
      )}

      {/* Poruka o uspešnoj prijavi */}
      {!showLoginPopup && isLoggedIn && (
        <div className="container mx-auto mt-16 p-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Prisutnost zabilježena
          </h2>
          <p className="text-lg text-center text-gray-600 mb-6">
            Hvala što ste se prijavili! Vaša prisutnost je evidentirana za sesiju {sessionId}.
          </p>

          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">Lista prisutnih:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-separate border-spacing-0">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-3 px-6 text-left">Ime i Prezime</th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-100 border-b">
                    <td className="py-3 px-6 text-gray-700">{student}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendPage;
