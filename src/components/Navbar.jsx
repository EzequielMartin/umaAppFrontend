import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import logo from "../assets/Uma_Musume_Logo.webp";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ user, setUser }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode ? JSON.parse(storedMode) : false;
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement; // <html>
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUmaappUser");
    setUser(null);
  };

  return (
    <nav className="bg-gray-100 p-4 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="UMA"
            className="flex justify-self-start h-16 min-w-fit"
            onClick={() => setOpen(false)}
          />
        </Link>
        <div
          className="hidden lg:flex justify-center gap-2" /* El flex-1 hace que el bloque de links ocupe todo el espacio disponible */
        >
          <Link
            to="/umas"
            className="font-bold px-4 py-2 text-black dark:text-white rounded bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 hover:from-gray-400 hover:via-gray-300 hover:to-gray-200 hover:dark:from-gray-700 hover:dark:via-gray-800 hover:dark:to-gray-900 shadow-lg"
          >
            Umas
          </Link>
          <Link
            to="/about"
            className="font-bold px-4 py-2 text-black dark:text-white rounded bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 hover:from-gray-400 hover:via-gray-300 hover:to-gray-200 hover:dark:from-gray-700 hover:dark:via-gray-800 hover:dark:to-gray-900 shadow-lg"
          >
            About
          </Link>
          <Link
            to="/contacto"
            className="font-bold px-4 py-2 text-black dark:text-white rounded bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 hover:from-gray-400 hover:via-gray-300 hover:to-gray-200 hover:dark:from-gray-700 hover:dark:via-gray-800 hover:dark:to-gray-900 shadow-lg"
          >
            Contacto
          </Link>
        </div>
        <div className="lg:flex justify-self-end space-x-2">
          {user && (
            <>
              <div className=" hidden lg:flex flex-row p-2 space-x-1 items-center text-black dark:text-white">
                <User />
                <span>{user.username}</span>
              </div>
              <button
                onClick={() => handleLogout()}
                className="hidden lg:flex font-bold px-4 py-2 text-black dark:text-white rounded bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 hover:from-gray-400 hover:via-gray-300 hover:to-gray-200 hover:dark:from-gray-700 hover:dark:via-gray-800 hover:dark:to-gray-900 shadow-lg"
              >
                Logout
              </button>
            </>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="hidden lg:flex px-4 py-2 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 hover:from-gray-400 hover:via-gray-300 hover:to-gray-200 hover:dark:from-gray-700 hover:dark:via-gray-800 hover:dark:to-gray-900 cursor-pointer rounded shadow-lg" /*Con el ml-auto hago que me agregue un margen de todo el ancho a la izquierda, por lo que los links quedan bien a la izquierda y el boton bien a la derecha*/
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex justify-self-end px-4 py-2 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 hover:from-gray-400 hover:via-gray-300 hover:to-gray-200 hover:dark:from-gray-700 hover:dark:via-gray-800 hover:dark:to-gray-900 cursor-pointer rounded shadow-lg" /*Con el ml-auto hago que me agregue un margen de todo el ancho a la izquierda, por lo que los links quedan bien a la izquierda y el boton bien a la derecha*/
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={28} />{" "}
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={28} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }} // arranca arriba, pequeño y transparente
            animate={{ opacity: 1, y: 0, scale: 1 }} // baja un poquito, se agranda y aparece
            exit={{ opacity: 0, y: -10, scale: 0.95 }} // se va para arriba, se achica y se desvanece
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute right-4 mt-2 w-40 rounded-xl shadow-2xl bg-gray-100 dark:bg-gray-900 lg:hidden"
          >
            <div className="flex flex-col p-4 space-y-2">
              <Link
                to="/umas"
                onClick={() => setOpen(false)}
                className="font-bold text-center px-4 py-2 text-black dark:text-white rounded bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 hover:from-gray-400 hover:via-gray-300 hover:to-gray-200 hover:dark:from-gray-700 hover:dark:via-gray-800 hover:dark:to-gray-900 shadow-lg"
              >
                Umas
              </Link>
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="font-bold text-center px-4 py-2 text-black dark:text-white rounded bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 hover:from-gray-400 hover:via-gray-300 hover:to-gray-200 hover:dark:from-gray-700 hover:dark:via-gray-800 hover:dark:to-gray-900 shadow-lg"
              >
                About
              </Link>
              <Link
                to="/contacto"
                onClick={() => setOpen(false)}
                className="font-bold text-center px-4 py-2 text-black dark:text-white rounded bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 hover:from-gray-400 hover:via-gray-300 hover:to-gray-200 hover:dark:from-gray-700 hover:dark:via-gray-800 hover:dark:to-gray-900 shadow-lg"
              >
                Contacto
              </Link>
              {user && (
                <button
                  onClick={() => handleLogout()}
                  className="font-bold text-center px-4 py-2 text-black dark:text-white rounded bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 hover:from-gray-400 hover:via-gray-300 hover:to-gray-200 hover:dark:from-gray-700 hover:dark:via-gray-800 hover:dark:to-gray-900 shadow-lg"
                >
                  Logout
                </button>
              )}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-4 py-2 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 hover:from-gray-400 hover:via-gray-300 hover:to-gray-200 hover:dark:from-gray-700 hover:dark:via-gray-800 hover:dark:to-gray-900 cursor-pointer rounded shadow-lg" /*Con el ml-auto hago que me agregue un margen de todo el ancho a la izquierda, por lo que los links quedan bien a la izquierda y el boton bien a la derecha*/
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
