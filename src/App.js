import './App.scss';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";


function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Header />
      </div>
    </BrowserRouter>
  );
}
export default App;
