import React from "react";
import LoginForm from "../components/LoginForm";

const Home = ({ user, setUser }) => {
  return (
    <div className="p-4 pb-5">
      <h1 className="text-4xl font-extrabold mb-4">Home de la UMA app</h1>
      {user ? (
        <div>Bienvenido {user.username}</div>
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </div>
  );
};

export default Home;
