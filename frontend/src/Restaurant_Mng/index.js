import { useSelector, useDispatch } from "react-redux";
import { addFoodTimer, deleteFoodTimer } from "./actions/index";
import './styls.css'
const StoreManagement = () => {
  const myState = useSelector((state) => state.UpdateFoodByDateTimer);
  const dispatch = useDispatch();
  const defineDate = new Date();
  return (<>
    <div className="redux-top">
      <h1>Select Time</h1>
      <div>
        {/* <h2>{defineDate}</h2> */}
        <button type="button"
          onClick={() => dispatch(addFoodTimer())}
          className="mx-2 btn btn-primary">Add 10 mins</button>
        <h2 className="mt-5">List of Food Items</h2>
      </div>
    </div>
  </>);
}

export default StoreManagement;