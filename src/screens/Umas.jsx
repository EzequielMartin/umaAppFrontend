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

  const updateUmas = (newUmas) => {
    setUmas(newUmas);
  };

  const borrarUma = async (uma) => {
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
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-800 text-white dark:text-gray-200 font-bold py-2 px-4 rounded shadow-lg"
        >
          Agregar Uma
        </button>
        <input
          type="text"
          className="ml-auto bg-gray-200 dark:bg-gray-600 dark:text-white py-2 px-4 rounded shadow-lg"
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
                  <UmaCard uma={uma} borrarUma={() => borrarUma(uma)} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      )}

      {showModal && (
        <UmaFormModal
          closeModal={() => setShowModal(false)}
          onUmaAdded={updateUmas}
        />
      )}
    </div>
  );
};

export default Umas;
