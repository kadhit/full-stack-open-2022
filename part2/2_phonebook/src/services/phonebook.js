import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl).then((response) => {
    return response.data;
  });
};

const createUser = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => {
    return response.data;
  });
};

const updateUser = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then((response) => {
    return response.data;
  });
};

const deleteUser = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => {
    console.log(response.data)
    return response.data;
  });
};

export const phonebook = {
  getAll,
  createUser,
  updateUser,
  deleteUser
};
