
// import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Menu from "./components/Menu";
import LoginPage from "./components/LoginPage";
import FavoritesPage from "./components/FavoritesPage";
import RegisterPage from "./components/RegisterPage";
import SearchPage from "./components/SearchPage";
import ProtectedRoute from "./shared/ProtectedRoute"

function App() {

  return (
    <Router>

      <Menu />


      <Routes>

        <Route path="/login" element={<ProtectedRoute requiresLogin={false} component={<LoginPage />} />} />

        <Route path="/register" element={<ProtectedRoute requiresLogin={false} component={<RegisterPage />} />} />

        <Route path="/search" element={<ProtectedRoute requiresLogin={true} component={<SearchPage />} />} />

        <Route path="/favorites" element={<ProtectedRoute requiresLogin={true} component={<FavoritesPage />} />} />

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;
