import { useSelector, useDispatch } from "react-redux";
import { incNumber, decNumber } from "./actions/index";
import './styles.css'

const ReduxDemo = () => {
  const myState = useSelector((state) => state.changeTheNumber);
  const dispatch = useDispatch();

  return (<>
    <div className="redux-top">
      <h1>Increment/Decrement counter</h1>
      <h4>using React and Redux</h4>
      <div>
        <button type="button"
          onClick={() => dispatch(decNumber())}
          className="btn btn-primary">-</button>
        <input name="quantity" type="text" className="text-center" value={myState} />
        <button type="button"
          onClick={() => dispatch(incNumber(5))}
          className="btn btn-primary">-</button>
      </div>
    </div>
  </>);
}

export default ReduxDemo;