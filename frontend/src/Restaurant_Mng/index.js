import { useSelector, useDispatch } from "react-redux";
import { addFoodTimer, deleteFoodTimer } from "./actions/index";
import './styls.css'
const StoreManagement = () => {
  const myState = useSelector((state) => state.changeTheNumber);
  const dispatch = useDispatch();

  return (<>
    <div className="redux-top">
      <h1>Select Time</h1>
      <div>
        <input name="quantity" type="text" className="text-center" value={myState} />
        <button type="button"
          onClick={() => dispatch(addFoodTimer())}
          className="mx-2 btn btn-primary">Add 10 mins</button>
      </div>
    </div>
  </>);
}

export default StoreManagement;