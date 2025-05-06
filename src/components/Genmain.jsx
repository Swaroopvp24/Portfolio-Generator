import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Genmain = ({ dark }) => {
  const location = useLocation();
  const userData = location.state?.userData;
  const navigate = useNavigate();

  const handlePortfolio1 = () => {
    navigate("/portfolio1", { state: { userData } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <h1 className="text-3xl font-bold mb-8 text-purple-700 dark:text-purple-200">
        Choose Your Portfolio Style
      </h1>
      <button
        onClick={handlePortfolio1}
        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:from-pink-600 hover:to-purple-600 transition-all duration-200 text-xl"
      >
        Portfolio 1
      </button>
    </div>
  );
};

export default Genmain;
