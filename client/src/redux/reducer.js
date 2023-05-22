import { 
  GET_TEMPS,
  GET_DOGS,
  GET_BY_NAME,
  FILTER_BREEDS_BY_TEMPERAMENT,
  BY_ORIGIN,
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
          allDogs: payload.apiDogs,
          dogsCopy: payload.dbDogs
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
      };

    case ORDER_WEIGHT:
      const orderDogsByWeight = [...state.allDogs];
      return {
        ...state,
        allDogs: orderDogsByWeight.sort((a, b) => {
          const weightA = a.weight.metric ? a.weight.metric.split(" – ") : [];
          const weightB = b.weight.metric ? b.weight.metric.split(" – ") : [];
    
          const minA = weightA.length > 0 ? Number(weightA[0]) : 0;
          const minB = weightB.length > 0 ? Number(weightB[0]) : 0;
    
          if (payload === "A") {
            return minA - minB;
          } else if (payload === "D") {
            return minB - minA;
          } else {
            return 0;
          }
        })
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

    case BY_ORIGIN:

      if (type.payload === "Database") {
          return {
              ...state,
              allDogs: state.dogsCopy.filter(recipe => recipe.id.length > 35)
          };
      }
      if (type.payload === "Api") {
          const dogsApiFiltered = state.dogsCopy.filter(recipe => typeof(recipe.id) === "number")
          return {
              ...state,
              allDogs: [...dogsApiFiltered]
          };
      } 
      if (type.payload === "ALL") {
          return {
              ...state,
              allDogs: [...state.dogsCopy]
          }
      }
      break

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