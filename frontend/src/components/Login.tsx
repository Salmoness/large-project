import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() 
{
    const [message,setMessage] = useState('');
    const [loginName,setLoginName] = React.useState('');
    const [loginPassword,setPassword] = React.useState('');
    const navigate = useNavigate();

    function doLogin(event:any) : void
    {
        event.preventDefault();
        // Simulate a login action
        alert("doIt()" + loginName + " " + loginPassword);
        navigate('/cards');
    }

    function handleSetLoginName( e: any ) : void
    {
        setLoginName( e.target.value );
    }
    function handleSetPassword( e: any ) : void
    {
        setPassword( e.target.value );
    }

    return (
        <div id="loginDiv">
            <span id="inner-title">LOG IN</span><br />
            <input type="text" id="loginName" placeholder="Username" onChange={handleSetLoginName} /><br />
            <input type="password" id="loginPassword" placeholder="Password" onChange={handleSetPassword} /><br />
            <input type="submit" id="loginButton" className="buttons" value= "Do It" onClick={doLogin} />
            <span id="loginResult">{message}</span>
        </div>
    )
}
export default Login;