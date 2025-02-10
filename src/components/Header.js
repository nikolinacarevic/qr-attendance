import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Dohvaćanje trenutne rute

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-xl font-bold">Evidencija studenata</div>

        <nav className="flex space-x-6">
          <Link
            to="/"
            className={`hover:underline ${location.pathname === "/" ? "font-bold border-b-2 border-white" : ""}`}
          >
            Predmeti
          </Link>
          <Link
            to="/reports"
            className={`hover:underline ${location.pathname === "/reports" ? "font-bold border-b-2 border-white" : ""}`}
          >
            Izvještaji
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <User className="w-6 h-6" />
          <span className="font-medium">Ime Prezime</span>
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-2" /> Odjavi se
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
