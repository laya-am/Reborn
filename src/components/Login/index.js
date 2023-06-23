import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

export default function Login() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        async function fetchData(){
            if (user) {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    method:"GET",
                    headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    const data = await response.json();
                    console.log("received data", data);
                    .then((data) => {
                        setProfile(data);
                    })
                    .catch((err) => console.log(err));
            }
        }
    fetchData()
    },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            {/* <h2>React Google Login</h2>
            <br />
            <br /> */}
            {/* {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : ( */}
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            {/* )} */}
        </div>
    );
}