import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App.jsx";
import io from "socket.io-client";
const URL = "http://localhost:8080";
const socket = io(URL);
const test = "test";

ReactDOM.render(<App socket={socket} />, document.getElementById("root"));
