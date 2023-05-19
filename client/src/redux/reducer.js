import { GET_TEMPS, GET_DOGS, BACK_PAGE, NEXT_PAGE, FILTER_BREEDS_BY_TEMPERAMENT, BY_BASE_LOCAL, ORDER, ORDER_WEIGHT, SET_TEMPERAMENTS,ADD_TEMPERAMENTS } from "./actions-types";

const initialState = {
  myDogs: [],
  allDogs: [],
  dogsFyO: [],
  temperaments: [],
  page: 1
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TEMPS:
      return {
        ...state,
        temperaments: payload
      }

    case GET_DOGS:
      return {
          ...state,
          allDogs: payload,
          dogsFyO: payload
      };

    case NEXT_PAGE:
        return { ...state, page: state.page + 1 };
    case BACK_PAGE:
        return { ...state, page: state.page - 1 };

    case FILTER_BREEDS_BY_TEMPERAMENT:
        const dogFiltred = state.allDogs.filter(dog => {
            let veri = dog.types;
            if (veri.includes(payload)) return dog;
        })

        return {
            ...state,
            dogsFyO: dogFiltred
        };

   case BY_BASE_LOCAL:
    if (payload === "base") {
      return {
          ...state,
          dogsFyO: state.allDogs.filter(dog => dog.id.length > 15)
      };
    }
    if (payload === "api") {

        const filtId = state.allDogs.filter(dog => dog.id < 500);
        return {
            ...state,
            dogsFyO: [...filtId]
        };
    } if (payload === "todos") {
        return {
            ...state,
            dogsFyO: [...state.allDogs]
        }
    }

    // eslint-disable-next-line no-fallthrough
    case ORDER:
      const orderDogs = [...state.dogsFyO];
      return {
        ...state,
        dogsFyO:
          payload === "A"
            ? orderDogs.sort((a, b) => a.name - b.name)
            : orderDogs.sort((a, b) => b.name - a.name)
      };

    case ORDER_WEIGHT:
      const orderDogsWeight = [...state.dogsFyO];
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
        myDogs: sortedDogsByWeight,
        orderByWeight: payload, // Actualizar el orden por peso en el estado
      };

    case SET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload, // Actualizar la lista de temperamentos en el estado
      };

    case ADD_TEMPERAMENTS:
        return { ...state, temperaments: payload };

    default:
      return state;
  }
};

export default reducer;