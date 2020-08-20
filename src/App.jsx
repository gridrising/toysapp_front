import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import CatalogPage from "./pages/catalogPage/CatalogPage";
import ToyPage from "./pages/toyPage/ToyPage";
import Navbar from "./components/Navbar";
import TablePage from "./pages/tablePage/TablePage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import LoginPage from "./pages/loginPage/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/toypage/:id" component={ToyPage} />
          <Route exact path="/" component={HomePage} />
          <Route path="/catalog" component={CatalogPage} />
          <Route path="/table" component={TablePage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
