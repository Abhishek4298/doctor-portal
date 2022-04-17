import React, { useReducer } from "react";

const initialData = 0;
const reducer = (state, action) => {
  switch (action) {
    case 'add':
      return state + 1;

    case 'substract':
      return state - 1;

    case 'reset':
      return initialData;

    default:
      return state;
  }
}
const ReducerDemo = () => {
  const [count, dispatch] = useReducer(reducer, initialData)

  return (<>
    <div className="container d-flex align-items-center justify-content-center">
      <div className="row">
        {count}
        <button type="button" onClick={() => dispatch('add')} className="btn btn-primary">+</button>
        <button type="button" onClick={() => dispatch('substract')} className="btn btn-primary">-</button>
        <button type="button" onClick={() => dispatch('reset')} className="btn btn-primary">Reset</button>
      </div>
    </div>

  </>);
}

export default ReducerDemo;