import { 
  GET_TEMPS,
  GET_DOGS,
  GET_BY_NAME,
  FILTER_BREEDS_BY_TEMPERAMENT,
  BY_ORIGIN,
  POST_DOG,
  ORDER_BY_NAME,
  ORDER_WEIGHT,
  SET_PAGE,
} from "./actions-types";

const initialState = {
  allDogs: [],
  dogsCopy: [],
  temperaments: [],
  details: [],
  page: 1,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DOGS:
      return {
          ...state,
          allDogs: payload,
          dogsCopy: payload,
      }

    case GET_TEMPS:
      return {
        ...state,
        temperaments: payload
      }

    case GET_BY_NAME:
      return {
        ...state,
        allDogs: payload
      }

    case ORDER_BY_NAME:
      const sortedDogsByName = [...state.allDogs];
      const sortOrderName = payload === 'Asc' ? 1 : -1;
      sortedDogsByName.sort((dogA, dogB) => {
        if (dogA.name > dogB.name) {
          return 1 * sortOrderName;
        }
        if (dogB.name > dogA.name) {
          return -1 * sortOrderName;
        }
        return 0;
      });

      return {
        ...state,
        allDogs: sortedDogsByName,
      }

    case ORDER_WEIGHT:
      const sortedDogsByWeight = [...state.allDogs];
      const weightAscendingOrder = payload === "min";

      sortedDogsByWeight.sort((first, second) => {
        const parseWeight = (weight) => {
          const parts = weight.split(" - ");
          const average = parts.reduce((sum, part) => sum + parseInt(part), 0);
          return isNaN(average) ? Infinity : average;
        };

        const weightFirst = parseWeight(first.weight);
        const weightSecond = parseWeight(second.weight);

        if (weightAscendingOrder) {
          return weightFirst - weightSecond;
        } else {
          return weightSecond - weightFirst;
        }
      });

      return {
        ...state,
        allDogs: sortedDogsByWeight,
      }
  
    case SET_PAGE:
      return { 
        ...state, 
        page: payload 
      }

    case FILTER_BREEDS_BY_TEMPERAMENT:
      const Dogs = state.dogsCopy //? Traigo toda la copia de perros
      const filterDog = (payload === "All") ?
          Dogs :
          Dogs.filter(dog => dog.temperament?.includes(payload)); //? Comparo payload de los temperamentos
      const filterDb = []; //? Acá guardo los temp de base de datos
      Dogs.forEach(dog => { //? Busco si el id es string (UUID)
          if (typeof dog.id === "string") {
              dog.temperament?.forEach(tempDb => {
                  if (tempDb === payload) filterDb.push(tempDb) //? Guardo los temp de perros de base de datos
              })
          }
      })
      return {
          ...state,
          allDogs: filterDog.concat(filterDb), //? Retorno todos los temp de API y los nuevos de DB juntos en un array
          error: null,
      }

    case BY_ORIGIN:
      const originDogs = state.dogsCopy;
      const filterDogs = originDogs.filter((dog) => payload === 'created' ? dog.createInDb : !dog.createInDb)
      return {
          ...state,
          allDogs: filterDogs,
      }

    case POST_DOG:
      return {
        ...state,
        allDogs: [...state.allDogs, payload],
      }

    default:
      return { ...state };
  }
};

export default reducer;