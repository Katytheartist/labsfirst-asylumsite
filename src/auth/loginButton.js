import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0(); //using destructuring to get this from Auth0

    const loginStyle = {
        cursor: 'pointer',
        border: 'none',
        borderRadius: '10px',
        color: 'var(--primary-color-white)',
        backgroundColor: 'var(--primary-color-pink)',
        fontFamily: 'var(--font-acumin-pro-regular)',
        fontSize: '20px',
        fontWeight: 'bold',
    };

    return (
        <button
            style={loginStyle}
            onClick={()=>loginWithRedirect()}
            
        >
            Log In
        </button>
    );
};

export default LoginButton;