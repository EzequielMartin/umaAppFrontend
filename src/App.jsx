import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./screens/About";
import Contacto from "./screens/Contacto";
import Home from "./screens/Home";
import Umas from "./screens/Umas";
import UmaInfo from "./screens/UmaInfo";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import umasService from "./services/umas";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUmaappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      umasService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col min-h-screen dark:bg-gray-800 dark:text-gray-400">
        <Navbar user={user} setUser={setUser} />
        {/* El tag "main" tiene una funcionalidad identica a un div pero se usa para indicar que aca esta el contenido principal de la app*/}
        <main className="flex- grow mb-6">
          <Routes>
            <Route path="/" element={<Home user={user} setUser={setUser} />} />
            <Route
              path="/umas"
              element={<Umas user={user} setUser={setUser} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/umas/:id" element={<UmaInfo />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
