import {
    ADD_DOGS,
    ADD_DOGS_DETAILS,
    ADD_RANDOM_DOGS_TO_DETAILS,
    ADD_TEMPERAMENTS,
    RESET_DOGS_DETAILS,
    SET_PAGINATION_INDEX,
    FILTER_DOGS_BY_TEMPERAMENT,
    FILTER_DOGS_BY_DOGS,
    FILTER_DOGS_BY_ID,
    RESET_DOGS_FILTER_BY_ID,
    SORT_DOGS,
  } from "./actions";
  
  const initialState = {
    dogs: {
      pagination: 1,
      data: [],
      __allData: [],
      __activeFilters: {
        temperaments: [],
        dogs: [],
        id: [],
      },
      __currentSort: {
        id: 0,
        keyName: "",
        asc: false,
      },
    },
    selectedDogsDetails: null,
    temperaments: [],
  };
  
  const filterDogs = (stateDogs, filterKeyName, payload, reset = false) => {
    const activeFilters = stateDogs.__activeFilters;
    if (filterKeyName && payload) activeFilters[filterKeyName] = payload;
  
    const allData = Array.isArray(stateDogs.__allData) ? stateDogs.__allData : [];
  
    return allData.filter((dog) => {
      const includesAllFilterTemperaments = activeFilters.temperaments.length ? activeFilters.temperaments.every((temperament) => dog.temperaments.includes(temperament)) : true;
      const dogsIsIncludedInDogsFilter = activeFilters.dogs.length ? activeFilters.dogs.includes(dog.name) : true;
      const idIsIncludedInIdFilter = activeFilters.id.length ? activeFilters.id.includes(dog.id) : filterKeyName === "id" && !reset ? false : true;
  
      return includesAllFilterTemperaments && dogsIsIncludedInDogsFilter && idIsIncludedInIdFilter;
    });
  };
  
  const sortDogs = (dogsToSort, stateDogs, payload) => {
    const { keyName, asc } = payload || stateDogs.__currentSort;
  
    return dogsToSort.sort((a, b) => {
      if (typeof a[keyName] === "string") {
        if (asc) return a[keyName].localeCompare(b[keyName]);
        return b[keyName].localeCompare(a[keyName]);
      }
      if (asc) return a[keyName] - b[keyName];
      return b[keyName] - a[keyName];
    });
  };
  
  export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
      case ADD_DOGS:
        const filterActive = !!state.dogs.__activeFilters.id.length;
        const alreadyData = !!state.dogs.data.length;
        const newState = { ...state, dogs: { ...state.dogs, pagination: 1, data: !filterActive || !alreadyData ? payload : state.dogs.data, __allData: payload } };

        // Verificar si `payload` es un arreglo antes de asignarlo a `stateDogs.__allData`payload : state.dogs.data, __allData: payload } };
        if (Array.isArray(payload)) {
          newState.dogs.__allData = payload;
        }
      
        if (!alreadyData) newState.dogs.data = sortDogs(filterDogs(state.dogs, "temperaments", payload), state.dogs);
        return newState;

      case ADD_DOGS_DETAILS:
        return { ...state, selectedDogsDetails: payload };
      case ADD_RANDOM_DOGS_TO_DETAILS:
        return { ...state, selectedDogsDetails: { ...state.selectedDogsDetails, randomDogs: payload } };
      case ADD_TEMPERAMENTS:
        return { ...state, temperaments: payload };
      case RESET_DOGS_DETAILS:
        return { ...state, selectedDogsDetails: null };
      case SET_PAGINATION_INDEX:
        return { ...state, dogs: { ...state.dogs, pagination: payload } };
      case FILTER_DOGS_BY_TEMPERAMENT:
        return {
          ...state,
          dogs: {
            ...state.dogs,
            pagination: 1,
            data: sortDogs(filterDogs(state.dogs, "temperaments", payload), state.dogs),
            __activeFilters: { ...state.dogs.__activeFilters, temperaments: payload },
          },
        };
      case FILTER_DOGS_BY_DOGS:
        return {
          ...state,
          dogs: {
            ...state.dogs,
            pagination: 1,
            data: sortDogs(filterDogs(state.dogs, "dogs", payload), state.dogs),
            __activeFilters: { ...state.dogs.__activeFilters, dogs: payload },
          },
        };
      case FILTER_DOGS_BY_ID:
        return {
          ...state,
          dogs: { ...state.dogs, pagination: 1, data: sortDogs(filterDogs(state.dogs, "id", payload), state.dogs), __activeFilters: { ...state.dogs.__activeFilters, id: payload } },
        };
      case RESET_DOGS_FILTER_BY_ID:
        return {
          ...state,
          dogs: { ...state.dogs, pagination: 1, data: sortDogs(filterDogs(state.dogs, "id", [], true), state.dogs), __activeFilters: { ...state.dogs.__activeFilters, id: [] } },
        };
      case SORT_DOGS:
        return {
          ...state,
          dogs: {
            ...state.dogs,
            pagination: 1,
            data: sortDogs(filterDogs(state.dogs, "id", [], true), state.dogs, payload),
            __currentSort: payload,
          },
        };
  
      default:
        return state;
    }
  }
  