import axios from "axios";

import { 
  GET_DOGS,
  GET_TEMPS,
  GET_BY_NAME,
  FILTER_BREEDS_BY_TEMPERAMENT,
  BY_ORIGIN,
  POST_DOG,
  ORDER,
  ORDER_WEIGHT,
  SET_PAGE, 
} from './actions-types';

export const getDogs = () => {
  return async (dispatch) => {
      const response = await axios.get("http://localhost:3001/dogs")
      return dispatch({
          type: GET_DOGS,
          payload: response.data
      })
  }
}

export const getTemps = () => {
  return async (dispatch) => {
      try {
          const response = await axios.get("http://localhost:3001/temperaments")
          dispatch({ type: GET_TEMPS, payload: [...response.data?.map(temperament => temperament.name)] })
      } catch (error) {
          error(error.message)
      }
  }
}

export const getByName = (name) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
    return dispatch ({
      type: GET_BY_NAME,
      payload: response.data,
    })
  };
}

export const setPage = (page) => {
  return { type: SET_PAGE, payload: parseInt(page) };
};

export const orderCards = (order) => {
  return { type: ORDER, payload: order.toString() };
};

export const orderCardsByWeight = (payload) => {
  return { type: ORDER_WEIGHT, payload };
};

export const filterBreedsByTemperament = (payload) => {
  return async (dispatch) => {
      dispatch({ type: FILTER_BREEDS_BY_TEMPERAMENT, payload });
  };
};

export const getByOrigin = (payload) => {
  return { type: BY_ORIGIN, payload };
};

export const postDog = (dog) => {
  return async (dispatch) => {
      try {
          const response = await axios.post('http://localhost:3001/dogs', { ...dog, createInDb: true });
          dispatch({ type: POST_DOG, payload: response.data });
          return response;
      } catch (error) {
          throw new Error(error.response.data);
      }
  };
};

