import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Auth0Provider } from "@auth0/auth0-react";

//create the custom auth0provider component

const CustomAuth0Provider = ({ children }) => {
    //get the history obj
    const history = useHistory(); 
    //fetch auth0 domain and clientid from env vars
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

    const onRedirectCallback = appState => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    //wrap children comps with auth0provider
    //auth0provider is a comp provided by @auth0/auth-react to integrate auth0 authentication into react apps

    return (
        <Auth0Provider
        domain={domain} //set the auth0 domain
        clientId={clientId} //set the auth0 client id
        redirectUri={window.location.origin} //set url to redirect after login
        onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider> // renders children comps inside the auth0provider
    );
};

export default CustomAuth0Provider;