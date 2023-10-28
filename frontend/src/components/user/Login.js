import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();


    const handleLogin = () => {
        loginWithRedirect();


        localStorage.setItem("isLoggedIn", "true");
    };

    return <button onClick={handleLogin}>Log In</button>;
};

export default LoginButton;