import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'profesor' && password === 'lozinka') {
      navigate('/');
    } else {
      alert('Krivi podaci');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Evidencija studenata</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-xl text-center text-gray-800 mb-6">Prijava u sustav</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
