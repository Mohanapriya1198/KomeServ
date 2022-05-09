import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "./pages/sign in/SignIn";
import NavBar from "./components/navbar/NavBar";
import SideBar from "./components/sidebar/SideBar";
import Routes from "./routes/Routes";
import "./App.css";
import { Redirect } from "react-router-dom";

function App() {
  const authData = () => {
    return localStorage.getItem("data");
  };
  return (
    <Switch>
      <Route
        exact
        path="/signIn"
        render={() => (!authData() ? <SignIn /> : <Redirect to="/" />)}
      />
      <>
        <div className="flex">
          <SideBar />
          <div className="navFlex">
            <NavBar />
            <Route render={() => <Routes />} />
          </div>
        </div>
      </>
    </Switch>
  );
}

export default App;
