import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { buildPath } from './Path';

function Register() 
{
    const [message,setMessage] = useState('');
    const [registerName,setRegisterName] = React.useState('');
    const [loginPassword,setPassword] = React.useState('');
    const navigate = useNavigate();

    async function doRegister(event:any) : Promise<void>
    {
        event.preventDefault();

        var obj = {register:registerName,password:loginPassword};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/login'), {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            if( res.id <= 0 )
            {
                var user = {firstName:"null",lastName:"null",id:-1}
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('User/Password combination incorrect');
            }
            else
            {
                user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                navigate('/cards'); 
            }
        }
        catch(error:any)
        {
            alert(error.toString());
            return;
        }
    }

    function handleSetRegisterName( e: any ) : void
    {
        setRegisterName( e.target.value );
    }
    function handleSetPassword( e: any ) : void
    {
        setPassword( e.target.value );
    }

    return (
        <div id="loginDiv">
            <span id="inner-title">Register</span><br />
            <input type="text" id="registername" placeholder="Set Username" onChange={handleSetRegisterName} /><br />
            <input type="password" id="loginPassword" placeholder="Password" onChange={handleSetPassword} /><br />
            <input type="submit" id="loginButton" className="buttons" value= "Do It" onClick={doRegister} />
            <p>Already have an account? <Link to="/">Log In Now</Link></p>
            <span id="loginResult">{message}</span>
        </div>
    )
}
export default Register;