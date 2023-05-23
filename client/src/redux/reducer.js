import { 
  GET_TEMPS,
  GET_DOGS,
  GET_BY_NAME,
  FILTER_BREEDS_BY_TEMPERAMENT,
  BY_ORIGIN,
  POST_DOG,
  ORDER,
  ORDER_WEIGHT,
  NEXT_PAGE,
  BACK_PAGE,
  SET_PAGE,
} from "./actions-types";

const initialState = {
  allDogs: [],
  dogsCopy: [],
  temperaments: [],
  details: [],
  page: 1
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

    case ORDER:
      const orderDogs = [...state.allDogs];
      return {
        ...state,
        allDogs:
          payload === "A"
            ? orderDogs.sort((a, b) => a.id - b.id)
            : orderDogs.sort((a, b) => b.id - a.id)
      }

    case ORDER_WEIGHT:
      const sortedDogsByWeight = [...state.allDogs]; //? Guardo copia de estado para luego hacer el ordenamiento en ella
      const weightAscendingOrder = payload === "min"; //? El orden será true(asc) o false(des)

      sortedDogsByWeight.sort((first, second) => {  //? Función para hace el ordenar perros segun el peso usando sort
          const parseWeight = weight => {
              const parts = weight.split(" - ");
              const average = parts.reduce((sum, part) => sum + parseInt(part), 0) //? Quito los espacios y guiones
              //? Guardo el promedio del peso paraseado y si no se puede parsear guarda al final
              return isNaN(average) ? Infinity : average;
          };
          const weightFirst = parseWeight(first.weight);  //? Guardo los dos pesos de los dos parámetros
          const weightSecond = parseWeight(second.weight); //? para luego compararlos y setear el orden

          if (weightAscendingOrder) { //? Si el orden elegido es min(true) será ascendente
              return weightFirst - weightSecond;
          } else {
              return weightSecond - weightFirst; //? de lo contrario será descendente
          }
      });
      return {
          ...state,
          allDogs: sortedDogsByWeight,
          error: null,
      }
  
    case NEXT_PAGE:
        return { ...state, page: state.page + 1 };
    case BACK_PAGE:
        return { ...state, page: state.page - 1 };
    case SET_PAGE:
      return { ...state, page: payload };

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