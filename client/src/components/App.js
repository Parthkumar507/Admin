import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import WelcomePage from "./WelcomePage";
// import HomePage from "./HomePage";

import Header from "../components/Header";

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
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;


  /* <div>
  { <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>

    </Routes>
  </BrowserRouter> }
</div> */

