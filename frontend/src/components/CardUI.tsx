import React, { useState } from "react";
import { buildPath } from "./Path.tsx";
import {
  retrieveJWTFromLocalStorage,
  saveJWTToLocalStorage,
} from "../assets/jwt-utils.ts";

function CardUI() {
  //let firstName : string = ud.firstName;
  //let lastName : string = ud.lastName;
  const [message, setMessage] = useState("");
  const [searchResults, setResults] = useState("");
  const [cardList, setCardList] = useState("");
  const [search, setSearchValue] = React.useState("");
  const [card, setCardNameValue] = React.useState("");

  async function addCard(e: any): Promise<void> {
    e.preventDefault();
    let obj = { card: card, jwt: retrieveJWTFromLocalStorage() };
    let js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath("api/cards/add"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      let txt = await response.text();
      let res = JSON.parse(txt);
      if (res.error) {
        setMessage("API Error:" + res.error);
      } else {
        setMessage("Card has been added");
        saveJWTToLocalStorage(res.jwt);
      }
    } catch (error: any) {
      setMessage(error.toString());
    }
  }

  async function searchCard(e: any): Promise<void> {
    e.preventDefault();
    let obj = { search: search, jwt: retrieveJWTFromLocalStorage() };
    let js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath("api/cards/search"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      let txt = await response.text();
      let res = JSON.parse(txt);
      let _results = res.results;
      let resultText = "";
      for (let i = 0; i < _results.length; i++) {
        resultText += _results[i];
        if (i < _results.length - 1) {
          resultText += ", ";
        }
      }
      setResults("Card(s) have been retrieved");
      saveJWTToLocalStorage(res.jwt);
      setCardList(resultText);
    } catch (error: any) {
      alert(error.toString());
      setResults(error.toString());
    }
  }

  function handleSearchTextChange(e: any): void {
    setSearchValue(e.target.value);
  }
  function handleCardTextChange(e: any): void {
    setCardNameValue(e.target.value);
  }

  return (
    <div id="cardUIDiv">
      <br />
      Search:{" "}
      <input
        type="text"
        id="searchText"
        placeholder="Card To Search For"
        onChange={handleSearchTextChange}
      />
      <button
        type="button"
        id="searchCardButton"
        className="buttons"
        onClick={searchCard}
      >
        {" "}
        Search Card
      </button>
      <br />
      <span id="cardSearchResult">{searchResults}</span>
      <p id="cardList">{cardList}</p>
      <br />
      <br />
      Add:{" "}
      <input
        type="text"
        id="cardText"
        placeholder="Card To Add"
        onChange={handleCardTextChange}
      />
      <button
        type="button"
        id="addCardButton"
        className="buttons"
        onClick={addCard}
      >
        {" "}
        Add Card{" "}
      </button>
      <br />
      <span id="cardAddResult">{message}</span>
    </div>
  );
}
export default CardUI;
