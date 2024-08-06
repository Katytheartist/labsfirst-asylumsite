import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const {user} = useAuth0();
    console.log(user);

    const imageStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '70%',

    };

    const containerStyle = {
        border: '4px solid #800080',
        borderRadius: '10px',
        padding: '30px',
        width: '500px',
        height: '500px',
        margin: 'auto',
        marginTop: '80px',
        marginBottom: '80px',
        backgroundColor: '#ff1493',
        boxShadow: '0px 10px 10px 0px rgba(0,0,0,0.1)',
    };

    const userInfoStyle = {
        textAlign: 'center',
    };


    return (
        <div style={containerStyle}>
            <img src={user?.picture} alt="Profile" style={imageStyle}/>
            <div style={userInfoStyle}>
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
            </div>
        </div>
    );
};

export default Profile;