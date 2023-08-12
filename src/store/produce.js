import produceData from "../mockData/produce.json";

const POPULATE = "produce/POPULATE";
const TOGGLE_LIKED = "produce/TOGGLE_LIKED";

export function populateProduce() {
  return {
    type: POPULATE,
    produce: produceData,
  };
}

export const toggleLiked = (produceId) => {
  return {
    type: TOGGLE_LIKED,
    produceId,
  };
};

export const getAllProduce = (state) => Object.values(state.produce);

export default function produceReducer(state = {}, action) {
  switch (action.type) {
    case POPULATE:
      const newState = {};
      action.produce.forEach((produce) => {
        newState[produce.id] = produce;
      });
      return newState;
    case TOGGLE_LIKED:
      const updatedProduce = {
        ...state[action.produceId],
        liked: !state[action.produceId].liked,
      };
      return {
        ...state,
        [action.produceId]: updatedProduce,
      };
    default:
      return state;
  }
}
