const initialState = new Date();
// const time = new Date();
// time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
// return (
//   <div>
//     <MyTimer expiryTimestamp={time} />
//   </div>
// );
const UpdateFoodByDateTimer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FOOD_TIMER": {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

      console.log("-------ADD_FOOD_TIMER---------------", state);
      return state + 1
    };

    case "DECR_FOOD_TIMER": return state - 1;
    default: return state;
  }
}

export default UpdateFoodByDateTimer;