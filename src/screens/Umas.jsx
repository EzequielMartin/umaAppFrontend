import React, { useEffect, useState } from "react";
import UmaCard from "../components/UmaCard";
import umaService from "../services/umas";
import UmaFormModal from "../components/UmaFormModal";
import SkeletonUmaCard from "../components/SkeletonUmaCard";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../components/LoginForm";
import { jwtDecode } from "jwt-decode";

const Umas = ({ user, setUser }) => {
  const [umas, setUmas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState("");
  const [initialUma, setInitialUma] = useState(null); //Initial uma es donde voy a settear la uma que voy a editar
  const [currentPage, setCurrentPage] = useState(1);

  //Cargo las umas cuando abro la app o cuando cambia el user
  useEffect(() => {
    const fetchUmas = async () => {
      if (!user || !user.token) return;
      try {
        setLoading(true);
        const umas = await umaService.getAll();
        setUmas(umas);
      } catch (error) {
        console.error("Error al cargar las Umas: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUmas();
  }, [user]);

  //Cierro sesion cuando expira el token
  useEffect(() => {
    if (!user || !user.token) return;

    try {
      const decodedToken = jwtDecode(user.token);
      const expTime = decodedToken.exp * 1000;
      const currentTime = Date.now();

      if (expTime <= currentTime) {
        setUser(null);
        localStorage.removeItem("loggedUmaappUser");
        return;
      }

      const timeUntilExpiration = expTime - currentTime;
      const timer = setTimeout(() => {
        setUser(null);
        localStorage.removeItem("loggedUmaappUser");
        alert("Tu sesión ha expirado, vuelve a iniciar sesión.");
      }, timeUntilExpiration);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error al decodificar el token", error);
      setUser(null);
      localStorage.removeItem("loggedUmaappUser");
    }
  }, [user, setUser]);

  //El prop onSubmit de UmaFormModal va a ser una de estas dos funciones dependiendo de si estoy agregando o editando una Uma

  const handleAddUma = async (newUma) => {
    await umaService.create(newUma);
    const updatedUmas = await umaService.getAll();
    setUmas(updatedUmas);
  };

  const handleUpdateUma = async (updatedUmaId, updatedUma) => {
    await umaService.update(updatedUmaId, updatedUma);
    const updatedUmas = await umaService.getAll();
    setUmas(updatedUmas);
  };

  const handleDeleteUma = async (uma) => {
    try {
      if (window.confirm(`¿Seguro que querés borrar a ${uma.name}?`)) {
        await umaService.remove(uma.id);
        setUmas((prevUmas) => {
          const updatedUmas = prevUmas.filter((u) => u.id !== uma.id);

          //Hago que en caso de borrar la unica uma de una pagina no me deje en una pagina vacia

          const totalPages = Math.ceil(updatedUmas.length / itemsPerPage);

          //Inicializo la newPage con la currentPage.
          //Si la pagina sigue teniendo elementos, en el setCurrentPage voy a dejar la pagina actual
          let newPage = currentPage;

          //Calculo el primer indice de la pagina actual
          const firstIndex = (currentPage - 1) * itemsPerPage;

          if (firstIndex >= updatedUmas.length && totalPages > 0) {
            //Si el indice del primer elemento de la pagina es mayor a la cantidad total de umas,
            //significa que la pagina actual no tiene elementos,
            //entonces voy a poner como pagina actual a la ultima pagina con elementos
            //Ademas el totalPages > 0 asegura que hay al menos una pagina con contenido
            newPage = totalPages;
          } else if (totalPages === 0) {
            //Si la cantidad de paginas es 0, significa que no hay elementos,
            //entones pongo como pagina actual a la pagina numero 1
            newPage = 1;
          }

          setCurrentPage(newPage);

          //Retorno lo que quiero aplicarle al setUmas().
          //Ya que no lo hago en una unica linea sino multiples lineas envueltas en {},
          //le debo pasar que es lo que quiero que quede en setUmas() en el return.
          return updatedUmas;
        });
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  //Implemento lo necesario para poder trabajar con paginas

  const itemsPerPage = 6;
  const filteredUmas = umas.filter((uma) =>
    uma.name.toLowerCase().includes(nameFilter.toLowerCase())
  );
  const totalPages = Math.ceil(filteredUmas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUmas = filteredUmas.slice(startIndex, endIndex);

  return (
    <>
      <h1 className="text-4xl font-extrabold p-4">Lista de Umas</h1>
      {user ? (
        <div className="p-4 pb-5">
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
              id="nameFilter"
              type="text"
              className="ml-auto w-48 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 dark:text-white py-2 px-4 rounded shadow-lg"
              placeholder="Filtrar por nombre"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>

          {loading ? (
            <SkeletonUmaCard />
          ) : (
            <>
              <AnimatePresence mode="wait">
                {/* Uso el mode="wait" asi los elemntos nuevos aparecen una vez que
            desaparecieron los anteriors, sino se ve mal */}
                <div className="flex flex-wrap gap-6 justify-center p-4">
                  {currentUmas.map((uma) => (
                    <motion.div
                      key={uma.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
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
                </div>
              </AnimatePresence>
              <div className="flex justify-center mt-6 gap-2">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                  Anterior
                </button>

                <span className="px-4 py-2">
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            </>
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
      ) : (
        <div className="p-4 pb-5">
          <h4 className="text-xl font-extrabold mb-4">
            Debes loguearte para poder ver la lista de umas
          </h4>
          <LoginForm setUser={setUser} />
        </div>
      )}
    </>
  );
};

export default Umas;
