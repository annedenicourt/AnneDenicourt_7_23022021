import React from "react";
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import axios from "axios";
require('dotenv').config();

function LoginGoogle() {

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
                window.localStorage.setItem('role', res.data.role)
                window.location.href = "/forum";
            })
            .catch(error=>console.log(error))
    };
    const onFailure = (res) => {
        console.log('[Login Failed] res:', res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="SE CONNECTER AVEC GOOGLE"
                onSuccess={onSuccess}
                onFailure={onFailure}
                 cookiePolicy={'single_host_origin'}
            />
        </div>

    )
}

export default LoginGoogle

