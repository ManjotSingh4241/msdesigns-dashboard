import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import "./App.css";
import RequestAccount from "./pages/new-member"
import Signup from "./pages/signup"
import Landing from "./pages/landing"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/NewMember" element={<RequestAccount />} />
          <Route path="/Landing" element={<Landing />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
