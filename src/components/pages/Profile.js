import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const {isAuthenticated, isLoading, error, user} = useAuth0();
    
    //Using the auth0 hook to manage authentication state

    // //static user data or user_metadata
    // const user = {
    //     name: 'Cody Nartist',
    //     email: 'painter1@artists.com',
    //     bio: 'Visual artists paint a lot and get inpired by many things.',
    //     imageUrl: 'https://picsum.photos/seed/picsum/200/300',
    // password: 'K@rtistOG#1'
    // };
    console.log('user==>  ', user);


    if(isLoading) {
        return <div>Loading...</div>;
    }
    //show loading message while authentication in progress.

    if(error){
        return <div>Oops, {error.message}</div>;
    }
    //show the error message if authentication fails.

    if(!isAuthenticated){
        return <div>Please log in to view your profile.</div>;
    }

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

    const profilePic = user?.user_metadata?.picture || user?.picture;
    const bio = user?.user_metadata?.bio || 'Bio not provided.';

    return (
        <div style={containerStyle}>
            <img src={profilePic} alt="Profile" style={imageStyle}/>
            <div style={userInfoStyle}>
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
                <p>{bio}</p>
            </div>
        </div>
    );
};

export default Profile;