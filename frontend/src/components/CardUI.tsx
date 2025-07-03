import React, { useState } from 'react'; 
import { buildPath } from './Path.tsx'; 
import { retrieveToken, storeToken } from '../tokenStorage'; 
import { jwtDecode } from 'jwt-decode';

function CardUI()
{
    //let firstName : string = ud.firstName;
    //let lastName : string = ud.lastName;
    const [message,setMessage] = useState(''); 
    const [searchResults,setResults] = useState(''); 
    const [cardList,setCardList] = useState(''); 
    const [search,setSearchValue] = React.useState(''); 
    const [card,setCardNameValue] = React.useState(''); 

    async function addCard(e:any) : Promise<void> 
    {
        e.preventDefault(); 
        let obj = { card:card, jwtToken:retrieveToken()}; 
        let js = JSON.stringify(obj);
        try
        {
            const response = await fetch(buildPath('api/addCard'), {method:'POST', body:js, headers:{'Content-Type': 'application/json'}}); 
            let txt = await response.text(); 
            let res = JSON.parse(txt); 
            if( res.error )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setMessage('Card has been added');
                storeToken( res.jwtToken );
            }
        }
        catch(error:any)
        {
            setMessage(error.toString());
        }
    };

    async function searchCard(e:any) : Promise<void>
    {
        e.preventDefault();
        let obj = {search:search, jwtToken:retrieveToken()};
        let js = JSON.stringify(obj);
        console.log("AAAA" + JSON.stringify(jwtDecode(obj.jwtToken)));
        try
        {
            const response = await fetch(buildPath('api/searchCards'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
            let resultText = '';
            for( let i=0; i<_results.length; i++ )
            {
                resultText += _results[i];
                if( i < _results.length - 1 )
                {
                    resultText += ', ';
                }
            }
            setResults('Card(s) have been retrieved');
            storeToken( res.jwtToken );
            setCardList(resultText);
            console.log("AAAA" + JSON.stringify(jwtDecode(res.jwtToken)));
        }
        catch(error:any)
        {
            alert(error.toString());
            setResults(error.toString());
        }
    };

    function handleSearchTextChange( e: any ) : void
    {
        setSearchValue( e.target.value );
    }
    function handleCardTextChange( e: any ) : void
    {
        setCardNameValue( e.target.value );
    }
    
    return(
        <div id="cardUIDiv">
            <br />
            Search: <input type="text" id="searchText" placeholder="Card To Search For"
                onChange={handleSearchTextChange} />
            <button type="button" id="searchCardButton" className="buttons"
                onClick={searchCard}> Search Card</button><br />
            <span id="cardSearchResult">{searchResults}</span>
            <p id="cardList">{cardList}</p><br /><br />
            Add: <input type="text" id="cardText" placeholder="Card To Add"
                onChange={handleCardTextChange} />
            <button type="button" id="addCardButton" className="buttons"
                onClick={addCard}> Add Card </button><br />
            <span id="cardAddResult">{message}</span>
        </div>
    );
}
export default CardUI;