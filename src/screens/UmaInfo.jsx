import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import umaService from "../services/umas";
import SkeletonUmaCard from "../components/SkeletonUmaCard";
import { motion, AnimatePresence } from "framer-motion";

const UmaInfo = () => {
  const { id } = useParams(); //Capturo el id de la URL
  const [uma, setUma] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUma = async () => {
      try {
        const response = await umaService.getOne(id);
        setUma(response.data);
      } catch (error) {
        console.error("Error obteniendo la uma: ", error);
      }
    };
    fetchUma();
  }, [id]);

  if (!uma) return <SkeletonUmaCard className=" " />;

  return (
    <div className="flex justify-center items-center p-4 pb-5">
      <AnimatePresence>
        <motion.div
          key={uma.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-100 text-gray-900 p-6 dark:bg-gray-900 dark:text-gray-300 rounded">
            <img
              className="w-full rounded"
              src={uma.avatar || "https://via.placeholder.com/400x200"}
              alt="Imagen"
            />
            <div className="flex flex-col items-center justify-center p-4">
              <h2 className="font-bold text-xl mb-2">{uma.name}</h2>
              <div className="text-gray-700 dark:text-gray-200">
                <p>Color de pelo: {uma.hair_color}</p>
                <p>Color de ojos: {uma.eye_color}</p>
                <p>Altura: {uma.height}cm</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => navigate(`/umas`)}
                className="bg-blue-500 hover:bg-blue-700 text-white dark:text-gray-200 font-bold py-2 px-4 rounded"
              >
                Volver
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default UmaInfo;
