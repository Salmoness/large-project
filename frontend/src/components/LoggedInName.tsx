//import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {
  retrieveJWTFromLocalStorage,
  forgetJWTInLocalStorage,
} from "../assets/jwt-utils";
import { jwtDecode } from "jwt-decode";

function LoggedInName() {
  if (typeof window === "undefined") return null;

  const navigate = useNavigate();

  function doLogout(event: any): void {
    event.preventDefault();
    forgetJWTInLocalStorage();
    navigate("/");
  }

  interface Payload {
    payload: any;
  }
  const jwt = jwtDecode<Payload>(retrieveJWTFromLocalStorage()).payload;

  return (
    <div id="loggedInDiv">
      <span id="userName">
        Logged In As {jwt.firstName} {jwt.lastName}{" "}
      </span>
      <br />
      <button
        type="button"
        id="logoutButton"
        className="buttons"
        onClick={doLogout}
      >
        {" "}
        Log Out{" "}
      </button>
    </div>
  );
}
export default LoggedInName;
