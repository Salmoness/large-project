import { jwtDecode } from "jwt-decode";

export function storeToken( tok:any ) : any
{
    try
    {
        localStorage.setItem('token_data', tok);
        console.log("Token stored: " + JSON.stringify(jwtDecode(tok)));
    }
    catch(e)
    {
        console.log(e);
    }
}

export function retrieveToken() : any
{
    var ud;
    try
    {
        ud = localStorage.getItem('token_data');
        if( !ud )
        {
            console.log("No token found in localStorage");
            return null;
        }
        console.log("Token retrieved: " + JSON.stringify(jwtDecode(ud)));
    }
    catch(e)
    {
        console.log(e);
    }
    return ud;
}