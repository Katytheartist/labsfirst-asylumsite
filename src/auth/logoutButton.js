import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout } = useAuth0();

    const logoutStyle = {
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        color: 'var(--primary-color-white)',
        backgroundColor: 'var(--primary-color-coral)',
        fontFamily: 'var(--font-acumin-pro-regular)',
        fontSize: '16px',
        fontWeight: 'bold',
    };

    return (
        <button
        style={logoutStyle}
        onClick={() => logout({ returnTo: window.location.origin })}
        >
            Logout
        </button>
    );
};

export default LogoutButton;