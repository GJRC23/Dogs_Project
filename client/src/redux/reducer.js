import { 
  GET_TEMPS,
  GET_DOGS,
  GET_BY_NAME,
  FILTER_BREEDS_BY_TEMPERAMENT,
  BY_BASE_LOCAL,
  ORDER,
  ORDER_WEIGHT,
  NEXT_PAGE,
  BACK_PAGE,
  SET_TEMPERAMENTS,
  ADD_TEMPERAMENTS
} from "./actions-types";

const initialState = {
  allDogs: [],
  dogsCopy: [],
  temperaments: [],
  page: 1
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DOGS:
      return {
          ...state,
          allDogs: payload,
          dogsCopy: payload
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
      const orderDogs = [...state.dogsCopy]
      return {
        ...state,
        dogsCopy:
          payload === "A"
            ? orderDogs.sort((a, b) => a.name - b.name)
            : orderDogs.sort((a, b) => b.name - a.name)
      };

      case ORDER_WEIGHT:
        let orderDogsWeight = [];
        if (Array.isArray(state.dogsCopy)) {
          orderDogsWeight = [...state.dogsCopy];
        }
        const sortedDogsByWeight = orderDogsWeight.sort((a, b) => {
          if (payload === 'asc') {
            return a.weight.metric - b.weight.metric;
          } else if (payload === 'desc') {
            return b.weight.metric - a.weight.metric;
          } else {
            return 0;
          }
        });
        return {
          ...state,
          dogsCopy: sortedDogsByWeight,
          orderByWeight: payload, // Actualizar el orden por peso en el estado
        };
    
    case NEXT_PAGE:
        return { ...state, page: state.page + 1 };
    case BACK_PAGE:
        return { ...state, page: state.page - 1 };

    case FILTER_BREEDS_BY_TEMPERAMENT:
      const dogsFiltered = state.temperaments.filter(dog => {
        let veri = dog.types;
        if (veri.includes(payload)) return dog;
    })

    return {
        ...state,
        dogsCopy: dogsFiltered
      };

   case BY_BASE_LOCAL:
    if (payload === "base") {
      return {
          ...state,
          dogsCopy: state.allDogs.filter(dog => dog.id.length > 15)
      };
    }
    if (payload === "api") {

        const filtId = state.allDogs.filter(dog => dog.id < 500);
        return {
            ...state,
            dogsCopy: [...filtId]
        };
    } if (payload === "todos") {
        return {
            ...state,
            dogsCopy: [...state.allDogs]
        }
    }

    case SET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload, // Actualizar la lista de temperamentos en el estado
      }

    case ADD_TEMPERAMENTS:
        return { ...state, temperaments: payload };



    default:
      return state;
  }
};

export default reducer;