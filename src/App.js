import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { LoggedInContext } from './helper/Context';

import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Lobby from "./routes/Lobby";
import Auth from "./routes/Auth";
import Oops from "./routes/Oops";
import Employees from "./routes/Employees";
import ProtectedRoutes from "./ProtectedRoutes";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/oops" element={<Oops />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" canChangeRoute={false} element={<Home />} />;
              <Route path="/employees" element={<Employees />} />
              <Route path="/auth" element={<Auth />} />
            </Route>
          </Routes>
        </Router>
      </LoggedInContext.Provider>
    </div>
  );
}

export default App;
