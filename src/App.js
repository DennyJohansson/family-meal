import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./index";
import Dishes from "./features/dishes";
import Menu from "./features/menu";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Dishes />
        <Menu />
      </div>
    </ApolloProvider>
  );
}

export default App;
