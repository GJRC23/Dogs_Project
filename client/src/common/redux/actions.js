import axios from "axios";
const CancelToken = axios.CancelToken;
const API_URL = process.env.REACT_APP_API_URL || "https://api.thedogapi.com/v1/breeds";

export const ADD_DOGS = "ADD_DOGS";
export const ADD_DOGS_DETAILS = "ADD_DOGS_DETAILS";
export const ADD_RANDOM_DOGS_TO_DETAILS = "ADD_RANDOM_DOGS_TO_DETAILS";
export const ADD_TEMPERAMENTS = "ADD_TEMPERAMENTS";
export const RESET_DOGS_DETAILS = "RESET_DOGS_DETAILS";
export const SET_PAGINATION_INDEX = "SET_PAGINATION_INDEX";
export const FILTER_DOGS_BY_TEMPERAMENT = "FILTER_DOGS_BY_TEMPERAMENT";
export const FILTER_DOGS_BY_DOGS = "FILTER_DOGS_BY_DOGS";
export const FILTER_DOGS_BY_ID = "FILTER_DOGS_BY_ID";
export const RESET_DOGS_FILTER_BY_ID = "RESET_DOGS_FILTER_BY_ID";
export const SORT_DOGS = "SORT_DOGS";

export const requestAll = () => async (dispatch, getState) => Promise.all([requestDogs()(dispatch), !getState().temperaments.length && requestTemperaments()(dispatch)]);

export const requestDogs = () => async (dispatch) => axios.get(`${API_URL}/dogs`).then((res) => dispatch(addDogs(res.data)));

export const requestDogsByID = (id) => async (dispatch) => dispatch(resetDogsDetails()) && axios.get(`${API_URL}/dogs/${id}`).then((res) => dispatch(addDogsDetails(res.data)));

export const requestRandomDogs = () => async (dispatch) => axios.get(`${API_URL}/dogs/randoms`).then((res) => dispatch(addRandomDogsToDetails(res.data)));

export const requestTemperaments = () => async (dispatch) => axios.get(`${API_URL}/temperaments`).then((res) => dispatch(addTemperaments(res.data)));

export const createDog = (dog) => async () => axios.post(`${API_URL}/dogs`, dog);

export const addDogs = (dogs) => ({
  type: ADD_DOGS,
  payload: dogs,
});

export const addDogsDetails = (dog) => ({
  type: ADD_DOGS_DETAILS,
  payload: dog,
});

export const addRandomDogsToDetails = (dogs) => ({
  type: ADD_RANDOM_DOGS_TO_DETAILS,
  payload: dogs,
});

export const addTemperaments = (temperaments) => ({
  type: ADD_TEMPERAMENTS,
  payload: temperaments,
});

export const resetDogsDetails = () => ({
  type: RESET_DOGS_DETAILS,
});

export const setPaginationIndex = (index) => ({
  type: SET_PAGINATION_INDEX,
  payload: index,
});

export const filterDogsByTemperament = (temperamentsArray) => ({
  type: FILTER_DOGS_BY_TEMPERAMENT,
  payload: temperamentsArray,
});

export const filterDogsByDogs = (dogsArray) => ({
  type: FILTER_DOGS_BY_DOGS,
  payload: dogsArray,
});

export const filterDogsByID = (idsArray) => ({
  type: FILTER_DOGS_BY_ID,
  payload: idsArray,
});

let cancel;
export const searchDogsByName = (name) => async (dispatch) => {
  cancel && cancel();
  if (!name) return dispatch(resetDogsFilterById());
  axios
    .get(`${API_URL}/dogs?name=${name}`, { cancelToken: new CancelToken((c) => (cancel = c)) })
    .then((res) => dispatch(filterDogsByID(res.data)))
    .catch(() => {});
};

export const resetDogsFilterById = () => ({
  type: RESET_DOGS_FILTER_BY_ID,
});

export const sortDogs = (sortBy) => ({
  type: SORT_DOGS,
  payload: sortBy,
});