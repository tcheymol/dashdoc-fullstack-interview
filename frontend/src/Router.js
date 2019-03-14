import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from "./HomePage";
import LoginPage from "./LoginPage";

function AppRouter() {
  return (
    <Router>
        <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/login/" component={() => <LoginPage />} />
        </div>
    </Router>
  );
}

export default AppRouter;
