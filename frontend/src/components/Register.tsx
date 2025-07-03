import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { buildPath } from './Path';
import { storeToken } from '../tokenStorage';

function Register() 
{
    const navigate = useNavigate();

    const [message,setMessage] = useState('');
    const [FirstName,setFirstName] = React.useState('');
    const [LastName,setLastName] = React.useState('');
    const [Username,setUsername] = React.useState('');
    const [Email,setEmail] = React.useState('');
    const [Password,setPassword] = React.useState('');
    const [ConfirmPassword,setConfirmPassword] = React.useState('');

    async function doRegister(event:any) : Promise<void>
    {
        event.preventDefault();

        let obj = {
            firstName: FirstName,
            lastName: LastName,
            username: Username,
            email: Email,
            password: Password,
            confirmPassword: ConfirmPassword
        };
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/register'), {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            if( res.error.length > 0)
            {
                throw new Error(res.error);
            }
            else
            {
                clearForm() 
                storeToken(res.jwtToken);
                navigate('/cards'); 
            }
        }
        catch(error:any)
        {
            setMessage(error.toString());
            return;
        }
    }

    function handleSetFirstName( e: any ) : void
    {
        setFirstName( e.target.value );
    }
    function handleSetLastName( e: any ) : void
    {
        setLastName( e.target.value );
    }
    function handleSetUsername( e: any ) : void
    {
        setUsername( e.target.value );
    }
    function handleSetEmail( e: any ) : void
    {
        setEmail( e.target.value );
    }
    function handleSetPassword( e: any ) : void
    {
        setPassword( e.target.value );
    }
    function handleSetConfirmPassword( e: any ) : void
    {
        setConfirmPassword( e.target.value );
    }

    function clearForm() : void
    {
        setFirstName('');
        setLastName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setMessage('');
    }


    return (
        <div id="loginDiv">
            <span id="inner-title">Register</span><br />
            <input type="text" placeholder="First Name" onChange={handleSetFirstName} /><br />
            <input type="text" placeholder="Last Name" onChange={handleSetLastName} /><br />
            <input type="text" placeholder="Username" onChange={handleSetUsername} /><br />
            <input type="text" placeholder="Email Address" onChange={handleSetEmail} /><br />
            <input type="password" placeholder="Password" onChange={handleSetPassword} /><br />
            <input type="password" placeholder="Confirm Password" onChange={handleSetConfirmPassword} /><br />
            <input type="submit" id="loginButton" className="buttons" value= "Do It" onClick={doRegister} />
            <p>Already have an account? <Link to="/">Log In Now</Link></p>
            <span id="loginResult">{message}</span>
        </div>
    )
}
export default Register;