import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import EntryPage from "./components/entry-page.component";
import LoggedIn from "./components/logged-in.component.js";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <Router>
      <Route path = "/entrypage" component={EntryPage} />
      <Route path = "/loggedin" component={LoggedIn} />
      <Route path = "/createuser" component={CreateUser} />
      
    </Router>
  );
}

export default App;
