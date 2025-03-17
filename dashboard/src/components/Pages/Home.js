import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./Dashboard";
import Transactions from "./Transaction";
import Budget from "./Budget";
import Profile from "./Profile";
import Notes from './Notes';

const Home = () => {
  return (
    <div className="dashboard-container">
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/transaction" element={<Transactions />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;