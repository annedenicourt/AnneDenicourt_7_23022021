import React from "react";
import { useReducer } from 'react';

function init (initialValue) {
    return { count: initialValue}
}
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1 };
    case 'decrement':
        if(state.count <=0) {
            return state
        }
      return {count: state.count - 1};
    case 'reset':
      return init(0);
    default:
      throw new Error();
  }
}

function Counter() {
  //const [count, setCount] = useState(initialCount);
  const [count, dispatch] = useReducer(reducer, 0, init);
  return (
    <div>
      Total : {JSON.stringify(count)}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'reset'})}>Reset</button>

      <Child />
    </div>
  );
}

function Child () {
    console.log('render')
    return <div>Hello</div>

}
export default Counter;
