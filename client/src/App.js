import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Launches from "./components/Launches.js";
import Launch from "./components/Launch.js";

import "./App.css";
import logo from "./SpaceX-Logo.png";

const client = new ApolloClient({
  uri: "/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Link to="/">
            <img
              src={logo}
              alt="SpaceX"
              style={{ width: 500, display: "block", margin: "auto" }}
            />
          </Link>
          <Route exact path="/" component={Launches} />
          <Route exact path="/launch/:flight_number" component={Launch} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
