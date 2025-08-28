import axios from "axios";
const baseUrl = "/api/umas";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

//Deslogueo automaticamente al usuario en caso de recibir un status code 401 en la request
//Esto lo puedo hacer ya que en el backend, en el controller de umas, retorno status code 401 cuando hay un error con el token
//Mirar el tokenExtractor del controller umas del backend en caso de duda
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      //Token invalido o vencido, fuerzo logout
      window.localStorage.removeItem("loggedUmaappUser");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const getOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, getOne, create, update, remove, setToken };
