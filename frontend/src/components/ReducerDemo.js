import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";

const initialData = {
  number: 0,
  marks: 50
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return { ...state, number: state.number + action.payload }

    case 'substract':
      return { ...state, number: state.number - action.payload }

    case 'reset':
      return initialData;

    case 'MarkAdd':
      return { ...state, marks: state.marks + action.payload }

    case 'API_ERROR':
      return { ...state, error: 'Something Went Wrong while fetching the api!' }

    default:
      return state;
  }
}
const ReducerDemo = () => {
  const [count, dispatch] = useReducer(reducer, initialData)
  const [articleList, setArticle] = useState([]);

  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    axios.get(url)
      .then(response => {
        setArticle(response.data)
      })
      .catch(error => {
        console.log("===> :: error", error);
        dispatch({ type: 'API_ERROR' })
      })
  }, [])

  return (<>
    <div className="container">
      <h1>{count.error ? count.error : null}</h1>

      <div>
        Number: - {count.number}
        <button type="button" onClick={() => dispatch({ type: 'add', payload: 5 })} >+</button>
        <button type="button" onClick={() => dispatch({ type: 'substract', payload: 1 })} >-</button>
        <button type="button" onClick={() => dispatch({ type: 'reset' })} >Reset</button>
      </div >
      <div>
        Marks: - {count.marks}
        <button onClick={() => dispatch({ type: 'MarkAdd', payload: 10 })}>Marks Add</button>
      </div>

      <div>
        {console.log("===> :: articleList", articleList)}
        {
          articleList && articleList.map((el) => {
            return <>
              <div key={el.id}>
                <h2>{el.name}</h2>
              </div>
            </>
          })
        }
      </div>
    </div >
  </>);
}

export default ReducerDemo;