//import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { retrieveToken } from '../tokenStorage';
import { jwtDecode } from 'jwt-decode';

function LoggedInName()
{
    interface UserData {
        firstName: string;
        lastName: string;
        UserId: number;
    }

    if (typeof window === 'undefined') return null;

    const navigate = useNavigate();

    function doLogout(event:any) : void
    {
        event.preventDefault();
        localStorage.removeItem("token_data");
        navigate("/");
    };

    let token = retrieveToken();
    console.log("Token: " + token);
    let userData = jwtDecode<UserData>(token);

    return(
        <div id="loggedInDiv">
        <span id="userName">Logged In As {userData.firstName} {userData.lastName} </span><br />
        <button type="button" id="logoutButton" className="buttons"
            onClick={doLogout}> Log Out </button>
        </div>
    );
};
export default LoggedInName;