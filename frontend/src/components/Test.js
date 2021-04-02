import React from "react";
import { useReducer } from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import axios from "axios";
require('dotenv').config();

/*function LoginGoogle() {

    const clientId = process.env.REACT_APP_CLIENT_ID_GOOGLE

    const onSuccess = (googleData) => {
        console.log('[Login Success] currentUser:', googleData.profileObj);

        axios.post('http://localhost:3000/api/auth/google', {
            email: googleData.profileObj.email,
            name: googleData.profileObj.name,
            token: googleData.tokenId
            }) 
            .then(res => {
                window.localStorage.setItem('token', res.data.token)
                //window.location.href = "/forum";
            })
            .catch(error=>console.log(error))
    };
    const onFailure = (res) => {
        console.log('[Login Failed] res:', res);
    };
    const onLogoutSuccess = () => {
        alert('Déconnexion réussie')
        localStorage.clear()
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Log in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                 cookiePolicy={'single_host_origin'}
            />
            <GoogleLogout
                clientId={clientId}
                buttonText="Log out with Google"
                onLogoutSuccess={onLogoutSuccess}
            />
        </div>

    )

}

export default LoginGoogle*/


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
