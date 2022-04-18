import { useSelector, useDispatch } from "react-redux";
import { addFoodTimer, deleteFoodTimer } from "./actions/index";
import './styls.css'
const StoreManagement = () => {
  const myState = useSelector((state) => state.UpdateFoodByDateTimer);
  const dispatch = useDispatch();
  return (<>
    <div className="d-flex justify-content-center">
      <h2>Cafe Coffee Day</h2>
    </div>
    <div className="container">
      <div className="row">
        <div className="col">Items</div>
        <div className="col"> Time to Prepare</div>
        <div className="col"> Action</div>
        <div className="w-100"></div>
        <div className="col">Cold Cofee</div>
        <div className="col">0.3 mins</div>
        <div className="col">15 Min</div>
        <button type="button"
          onClick={() => dispatch(addFoodTimer())}
          className="btn btn-primary btn-sm">Order</button>
        <div className="w-100 mb-5"></div>
        <div className="col">Cold Cofee</div>
        <div className="col">0.3 mins</div>
        <div className="col">15 Min</div>
        <button type="button"
          onClick={() => dispatch(addFoodTimer())}
          className="btn btn-primary btn-sm">Order</button>
      </div>
    </div>
  </>);
}

export default StoreManagement;