import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Uma_Musume_Logo.webp";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode ? JSON.parse(storedMode) : false;
  });

  useEffect(() => {
    const root = window.document.documentElement; // <html>
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <nav className="bg-gray-100 p-4 dark:bg-gray-900">
      <div className="grid grid-cols-3 items-center">
        <img src={logo} alt="UMA" className="flex justify-self-start h-16" />
        <div
          className="flex justify-center gap-2" /* El flex-1 hace que el bloque de links ocupe todo el espacio disponible */
        >
          <Link
            to="/"
            className="font-bold px-4 py-2 text-black dark:text-white rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-800 shadow-lg"
          >
            Home
          </Link>
          <Link
            to="/umas"
            className="font-bold px-4 py-2 text-black dark:text-white rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-800 shadow-lg"
          >
            Umas
          </Link>
          <Link
            to="/about"
            className="font-bold px-4 py-2 text-black dark:text-white rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-800 shadow-lg"
          >
            About
          </Link>
          <Link
            to="/contacto"
            className="font-bold px-4 py-2 text-black dark:text-white rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-800 shadow-lg"
          >
            Contacto
          </Link>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex justify-self-end px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-200 rounded shadow-lg" /*Con el ml-auto hago que me agregue un margen de todo el ancho a la izquierda, por lo que los links quedan bien a la izquierda y el boton bien a la derecha*/
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
