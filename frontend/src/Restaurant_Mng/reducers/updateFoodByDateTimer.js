const initialState = 0;

const UpdateFoodByDateTimer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FOOD_TIMER": {
      console.log("-------ADD_FOOD_TIMER---------------", state);
      return state + 1
    };

    case "DECR_FOOD_TIMER": return state - 1;
    default: return state;
  }
}

export default UpdateFoodByDateTimer;