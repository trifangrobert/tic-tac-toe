import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import classes from './App.module.css'

ReactDOM.render(
  <BrowserRouter>
    <App className={classes.App}/>
  </BrowserRouter>,
  document.getElementById("root")
);
