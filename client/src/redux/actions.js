import axios from "axios";

import { 
  GET_DOGS,
  GET_TEMPS,
  GET_BY_NAME,
  FILTER_BREEDS_BY_TEMPERAMENT,
  BY_BASE_LOCAL,
  ORDER,
  ORDER_WEIGHT,
  NEXT_PAGE,
  BACK_PAGE,
  SET_TEMPERAMENTS,
  ADD_TEMPERAMENTS 
} from './actions-types';

export const getDogs = () => {
  return async (dispatch) => {
    try {
      const dataDb = await axios.get("http://localhost:3001/dogs");
      const dogsB = dataDb.data;
      const dataApi = await axios.get("https://api.thedogapi.com/v1/breeds");
      const dogsA = dataApi.data;

      dispatch({ 
        type: GET_DOGS, 
        payload: { apiDogs: dogsA, dbDogs: dogsB } 
      });
    } catch (error) {
      // Manejo de errores
      console.error(error);
    }
  };
};

export const getTemps = () => {
  return async (dispatch) => {
      const temps = await axios.get("http://localhost:3001/temperaments");
      const dogsA = temps.data;

      dispatch({ type: GET_TEMPS, payload: [...dogsA] });
  };
}

export const getByName = (name) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/dogs/?name=${name}`);
    return dispatch ({
      type: GET_BY_NAME,
      payload: response.data,
    })
  };
}

export const nextPage = () => {
  return async (dispatch) => {

      dispatch({ type: NEXT_PAGE });
  };
};
export const backPage = () => {
  return async (dispatch) => {

      dispatch({ type: BACK_PAGE });
  };
};

export const orderCards = (order) => {
  return { type: ORDER, payload: order };
};

export const orderCardsByWeight = (order) => ({
  type: ORDER_WEIGHT,payload: order,}
);

export const filterBreedsByTemperament = (type) => {
  return async (dispatch) => {
      dispatch({ type: FILTER_BREEDS_BY_TEMPERAMENT, payload: type });
  };
};

export const getByOrigin = (origen) => {
  return { type: BY_BASE_LOCAL, payload: origen };
};

export const setTemperaments = (temperamentsArray) => ({
  type: SET_TEMPERAMENTS,
  payload: temperamentsArray,
});

export const requestTemperaments = () => async (dispatch) => axios.get('http://localhost:3001/temperaments').then((res) => dispatch(addTemperaments(res.data)));

export const createBreed = (breed) => async () => axios.post('http://localhost:3001/dogs', breed);

export const addTemperaments = (temperaments) => ({
  type: ADD_TEMPERAMENTS,
  payload: temperaments,
});