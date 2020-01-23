import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./index";
import Dishes from "./features/dishes";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Dishes />
      </div>
    </ApolloProvider>
  );
}

export default App;
