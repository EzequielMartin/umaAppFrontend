import React, { useEffect, useState } from "react";
import umaService from "../services/umas";

const UmaFormModal = ({ closeModal, onSubmit, initialUma }) => {
  const [name, setName] = useState("");
  const [colorOjos, setColorOjos] = useState("");
  const [colorPelo, setColorPelo] = useState("");
  const [altura, setAltura] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  //initialUma va a ser distinto de null si estoy editando una uma, ya que la paso desde Umas.jsx

  useEffect(() => {
    if (initialUma) {
      //initialUma es distinto de null (estoy editando), entonces cargo los campos del formulario con los valores iniciales de la Uma que estoy editando, asi edito solo los campos que necesito
      setName(initialUma.name || "");
      setColorOjos(initialUma.eye_color || "");
      setColorPelo(initialUma.hair_color || "");
      setAltura(initialUma.height || "");
      setImageBase64(initialUma.avatar || "");
    }
  }, [initialUma]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const umaObject = {
        name: name,
        hair_color: colorPelo,
        eye_color: colorOjos,
        height: altura,
        avatar: imageBase64,
      };

      //Si initialUma es distinto de null (estoy editando) voy a llamar al onSubmit de dos parametros, este es el handleUpdateUma que esta en Umas.jsx
      if (initialUma) {
        await onSubmit(initialUma.id, umaObject);
      } else {
        //Si initialUma es null (estoy agregando) voy a llamar al onSubmit de un parametros, este es el handleAddUma que esta en Umas.jsx
        await onSubmit(umaObject);
      }

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
        <h2 className="text-lg font-bold mb-4">
          {/* Si initialUma es distinto de null estoy editando, sino estoy agregando */}
          {initialUma ? "Editar Uma" : "Agregar Uma"}
        </h2>
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
              {/* Si initialUma es distinto de null estoy editando, sino estoy agregando */}
              {initialUma ? "Guardar Cambios" : "Agregar"}
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
