import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import CatalogPage from "./pages/catalogPage/CatalogPage";
import ToyPage from "./pages/toyPage/ToyPage";
import Navbar from "./components/Navbar";
import TablePage from "./pages/tablePage/TablePage";

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/toypage/:id' component={ToyPage} />
          <Route exact path='/' component={HomePage} />
          <Route path='/catalog' component={CatalogPage} />
          <Route path='/table' component={TablePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
