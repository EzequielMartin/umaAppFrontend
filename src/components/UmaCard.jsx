import React from "react";
import { useNavigate } from "react-router-dom";

const UmaCard = ({ uma, borrarUma, editarUma }) => {
  const navigate = useNavigate();

  const irAInfo = () => {
    navigate(`/umas/${uma.id}`);
  };

  return (
    <div className="max-w-sm w-64 h-86 hover:scale-102 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-300 p-6 rounded overflow-hidden shadow-lg hover:shadow-gray-500 dark:hover:shadow-gray-950">
      <img
        className="w-full h-48 object-cover rounded bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600"
        src={uma.avatar || "https://via.placeholder.com/400x200"}
        alt="Imagen"
      />
      <div className="mt-4 text-center">
        <h2 className="font-bold text-xl mb-2">{uma.name}</h2>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <button
          type="button"
          onClick={irAInfo}
          className="bg-green-600/80 hover:bg-green-800/80 text-white font-bold py-2 px-4 rounded shadow-lg"
        >
          Info
        </button>
        <button
          type="button"
          onClick={editarUma}
          className="bg-blue-600/80 hover:bg-blue-800/80 text-white font-bold py-2 px-4 rounded shadow-lg"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={borrarUma}
          className="bg-red-600/80 hover:bg-red-800/80 text-white font-bold py-2 px-4 rounded shadow-lg"
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

export default UmaCard;
