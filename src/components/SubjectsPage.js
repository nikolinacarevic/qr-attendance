import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Ponedjeljak');
  const navigate = useNavigate();

   useEffect(()=>{
      fetch(`http://localhost:5000/api/subjects`)
      .then(response=>response.json())
      .then(data=>{
        if (data.length > 0) {
          setSubjects(data); // Dohvati listu predmeta
          console.log("marija voli nevolju")
        }
      })
      .catch(error => {
        console.error('Greška pri dohvaćanju predmeta', error);
      });
    },[])
  

  const handleSubjectClick = (id, name) => {
    navigate(`/scan?subjectId=${id}&subjectName=${encodeURIComponent(name)}`);
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
                onClick={() => handleSubjectClick(subject.id, subject.name)}
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
