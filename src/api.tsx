import axios from 'axios';

const axiosObject = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

const api: { getCharactersPerPage: Function, getLocationsPerPage: Function } = {
  getCharactersPerPage: (pageNumber: Number) => axiosObject.get('/character', {
    params: {
      page: pageNumber
    }
  }),
  getLocationsPerPage: (pageNumber: Number) => axiosObject.get('/location', {
    params: {
      page: pageNumber
    }
  }),
}

export { api };