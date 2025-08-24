import React, { useEffect, useState } from "react";
import UmaCard from "../components/UmaCard";
import umaService from "../services/umas";
import UmaFormModal from "../components/UmaFormModal";
import SkeletonUmaCard from "../components/SkeletonUmaCard";
import { motion, AnimatePresence } from "framer-motion";

const Umas = () => {
  const [umas, setUmas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState("");
  const [initialUma, setInitialUma] = useState(null); //Initial uma es donde voy a settear la uma que voy a editar

  useEffect(() => {
    const fetchUmas = async () => {
      try {
        const response = await umaService.getAll();
        setUmas(response.data);
      } catch (error) {
        console.error("Error al cargar las Umas: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUmas();
  }, []);

  //El prop onSubmit de UmaFormModal va a ser una de estas dos funciones dependiendo de si estoy agregando o editando una Uma

  const handleAddUma = async (newUma) => {
    await umaService.create(newUma);
    const response = await umaService.getAll();
    setUmas(response.data);
  };

  const handleUpdateUma = async (updatedUmaId, updatedUma) => {
    await umaService.update(updatedUmaId, updatedUma);
    const response = await umaService.getAll();
    setUmas(response.data);
  };

  const handleDeleteUma = async (uma) => {
    try {
      if (window.confirm(`¿Seguro que querés borrar a ${uma.name}?`)) {
        await umaService.remove(uma.id);
        setUmas((prevUmas) => prevUmas.filter((u) => u.id !== uma.id));
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="p-4 pb-5">
      <h1 className="text-4xl font-extrabold mb-4">Lista de Umas</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            /* Cuando voy a agregar una Uma nueva la initial Uma va a ser null, abro el modal de agregar Uma */
            setInitialUma(null);
            setShowModal(true);
          }}
          className="bg-blue-600/80 hover:bg-blue-800/80 text-white dark:text-gray-200 font-bold py-2 px-4 rounded shadow-lg"
        >
          Agregar Uma
        </button>
        <input
          type="text"
          className="ml-auto bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 dark:text-white py-2 px-4 rounded shadow-lg"
          placeholder="Filtrar por nombre"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>

      {loading ? (
        <SkeletonUmaCard />
      ) : (
        <div className="flex flex-wrap gap-6 justify-center p-4">
          <AnimatePresence>
            {umas
              .filter((uma) =>
                uma.name.toLowerCase().includes(nameFilter.toLowerCase())
              )
              .map((uma) => (
                <motion.div
                  key={uma.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <UmaCard
                    uma={uma}
                    borrarUma={() => handleDeleteUma(uma)}
                    editarUma={() => {
                      /* Cuando voy a editar una Uma, voy a setear la Uma a editar en Initial uma y abro el modal de edicion (es el mismo que el de adicion pero con los datos de la Uma inicial cargados) */
                      setInitialUma(uma);
                      setShowModal(true);
                    }}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      )}

      {showModal && (
        <UmaFormModal
          closeModal={() => {
            /* Cuando se cierra el modal se pone como null la Uma inicial y se oculta el modal del formulario */
            setInitialUma(null);
            setShowModal(false);
          }}
          /* Si initialUma es null voy a pasarle el handleAddUma y si es distinto de null (estoy editando) le paso el handleUpdateUma */
          onSubmit={initialUma ? handleUpdateUma : handleAddUma}
          initialUma={initialUma}
        />
      )}
    </div>
  );
};

export default Umas;
