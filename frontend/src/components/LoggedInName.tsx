//import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function LoggedInName()
{
    const navigate = useNavigate();

    //let user={}
    function doLogout(event:any) : void
    {
        event.preventDefault();
        localStorage.removeItem("user_data");
        navigate("/");
    };
    return(
        <div id="loggedInDiv">
        <span id="userName">Logged In As John Doe </span><br />
        <button type="button" id="logoutButton" className="buttons"
            onClick={doLogout}> Log Out </button>
        </div>
    );
};
export default LoggedInName;