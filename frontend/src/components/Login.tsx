import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { buildPath } from './Path';
import { storeToken } from '../tokenStorage';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

function Login() 
{
    const [message,setMessage] = useState('');
    const [loginName,setLoginName] = React.useState('');
    const [loginPassword,setPassword] = React.useState('');
    const navigate = useNavigate();

    async function doLogin(event:any) : Promise<void>
    {
        // interface MyPayload {
        //     userId: number;
        //     firstName: string;
        //     lastName: string;
        // }

        event.preventDefault();

        var obj = {login:loginName,password:loginPassword};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/login'), {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res.error);
            storeToken(res.jwtToken);
            try
            {
                if( res.error )
                {
                    setMessage(res.error);
                    console.log(res.error);
                }
                else
                {
                    // let user = {firstName:firstName, lastName:lastName, id:userId};
                    // localStorage.setItem('user_data', JSON.stringify(user));
                    setMessage('');
                    navigate('/cards'); 
                }
            }
            catch(e)
            {
                console.log(e);
                return
            }
        }
        catch(error:any)
        {
            alert(error.toString());
            return;
        }
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
            <span id="inner-title">LOG IN PLEASEEEEE</span><br />
            <input type="text" id="loginName" placeholder="Username" onChange={handleSetLoginName} /><br />
            <input type="password" id="loginPassword" placeholder="Password" onChange={handleSetPassword} /><br />
            <input type="submit" id="loginButton" className="buttons" value= "Do It" onClick={doLogin} />
            <p>Don't have an account? <Link to="/register">Register Now</Link></p>
            <span id="loginResult">{message}</span>
        </div>
    )
}
export default Login;