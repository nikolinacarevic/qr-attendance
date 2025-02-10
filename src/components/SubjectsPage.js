import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Ponedjeljak');
  const navigate = useNavigate();

  useEffect(() => {
    setSubjects([
      { id: 1, name: 'Ugradbeni računalni sustavi 250', location: 'Dvorana A100', time: '10:15 - 12:00', day: 'Ponedjeljak' },
      { id: 2, name: 'Arhitektura računala 920', location: 'Dvorana A103', time: '12:15 - 14:00', day: 'Utorak' },
      { id: 3, name: 'Operacijski sustavi 120', location: 'Dvorana A100', time: '08:15 - 10:00', day: 'Srijeda' },
      { id: 4, name: 'Arhitektura digitalnih računala 550', location: 'Dvorana A104', time: '10:15 - 12:00', day: 'Ponedjeljak' },
      { id: 5, name: 'Napredne arhitekture računala 220', location: 'Dvorana A100', time: '14:15 - 16:00', day: 'Petak' },
    ]);
  }, []);

  const handleSubjectClick = (id) => {
    navigate(`/scan`);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const filteredSubjects = subjects.filter(subject => subject.day === selectedDay);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto mt-10 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Popis predmeta</h2>

        <div className="flex space-x-4 mb-6">
          {['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak'].map((day) => (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`px-4 py-2 rounded-lg text-white ${selectedDay === day ? 'bg-blue-500' : 'bg-gray-400'}`}
            >
              {day.substring(0, 3)}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center space-y-6">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => (
              <div
                key={subject.id}
                onClick={() => handleSubjectClick(subject.id)}
                className="bg-white shadow-md p-6 rounded-lg w-96 cursor-pointer transition hover:shadow-lg hover:bg-blue-100"
              >
                <h3 className="text-lg font-semibold text-left">{subject.name}</h3>
                <div className="flex items-center mt-4">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{subject.location}</span>
                </div>
                <div className="flex items-center mt-2">
                  <FaClock className="mr-2" />
                  <span>{subject.time}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-600">Nema predmeta za odabrani dan.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubjectsPage;
