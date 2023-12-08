import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import WelcomePage from "./WelcomePage";
// import HomePage from "./HomePage";

import Header from "../components/Header";
import RolesAndPermission from "./Settings/RolesAndPermission";

// import RegisterPage from './RegisterPage'

const App = () => {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/welcome" element={<WelcomePage/>} />
          <Route path="Settings/RolesandPermission/:userId" element={<RolesAndPermission/>}/>
          <Route path="Settings/RolesandPermission/" element={<RolesAndPermission/>}/>

        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;

