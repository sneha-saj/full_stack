import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson);
};

const phonebookService = {
  getAll,
  create,
  update,
};

export default phonebookService;
