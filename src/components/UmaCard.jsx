import React from "react";
import { useNavigate } from "react-router-dom";

const UmaCard = ({ uma, borrarUma, editarUma }) => {
  const navigate = useNavigate();

  const irAInfo = () => {
    navigate(`/umas/${uma.id}`);
  };

  return (
    <div className="max-w-sm w-64 h-86 rounded overflow-hidden shadow-lg bg-gray-100 text-gray-900 p-6 dark:bg-gray-900 dark:text-gray-300">
      <img
        className="w-full h-48 object-cover rounded"
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
          className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded shadow-lg"
        >
          Info
        </button>
        <button
          type="button"
          onClick={editarUma}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded shadow-lg"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={borrarUma}
          className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded shadow-lg"
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

export default UmaCard;
