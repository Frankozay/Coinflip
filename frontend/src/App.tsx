import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "@/pages/Login";
import GameHall from "@/pages/GameHall";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/gameHall" element={<GameHall />} />
      </Routes>
    </Router>
  );
};

export default App;
