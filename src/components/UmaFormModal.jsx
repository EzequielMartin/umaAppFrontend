import React, { useState } from "react";
import umaService from "../services/umas";

const UmaFormModal = ({ closeModal, onUmaAdded }) => {
  const [name, setName] = useState("");
  const [colorOjos, setColorOjos] = useState("");
  const [colorPelo, setColorPelo] = useState("");
  const [altura, setAltura] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Agrego la UMA

    try {
      const umaObject = {
        name: name,
        hair_color: colorPelo,
        eye_color: colorOjos,
        height: altura,
        avatar: imageBase64,
      };
      await umaService.create(umaObject);
      const response = await umaService.getAll();
      const umaList = response.data;
      onUmaAdded(umaList);
      closeModal();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 dark:bg-gray-700 dark:text-gray-200">
        <h2 className="text-lg font-bold mb-4">Agregar Uma</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="name" className="font-semibold">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 mb-2 rounded"
            required
          />
          <label htmlFor="name" className="font-semibold">
            Color de ojos
          </label>
          <input
            id="colorOjos"
            type="text"
            placeholder="Color de ojos"
            value={colorOjos}
            onChange={(e) => setColorOjos(e.target.value)}
            className="border p-2 mb-2 rounded"
            required
          />
          <label htmlFor="name" className="font-semibold">
            Color de pelo
          </label>
          <input
            id="colorPelo"
            type="text"
            placeholder="Color de pelo"
            value={colorPelo}
            onChange={(e) => setColorPelo(e.target.value)}
            className="border p-2 mb-2 rounded"
            required
          />
          <label htmlFor="name" className="font-semibold">
            Altura
          </label>
          <input
            id="altura"
            type="text"
            placeholder="Altura"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            className="border p-2 mb-2 rounded"
            required
          />
          <label htmlFor="image" className="font-semibold">
            Imagen
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            placeholder="Insertar imagen"
            onChange={handleImageChange}
            className="border p-2 mb-2 rounded"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white dark:text-gray-200 font-bold py-2 px-4 rounded"
            >
              Agregar
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 hover:bg-gray-700 text-white dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UmaFormModal;
