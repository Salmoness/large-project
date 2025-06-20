function Login() 
{

    function doLogin(event:any) : void
    {
        event.preventDefault();
        // Simulate a login action
        console.log("Login action performed");
        alert("doIt()")
    }

    return (
        <div id="loginDiv">
            <span id="inner-title">LOG IN</span><br />
            <input type="text" id="loginName" placeholder="Username" /><br />
            <input type="password" id="loginPassword" placeholder="Password" /><br />
            <input type="submit" id="loginButton" className="buttons" value= "Do It" onClick={doLogin} />
            <span id="loginResult"></span>
        </div>
    )
}
export default Login;