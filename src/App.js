import './App.scss';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";


function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Header />
        <Routes>
          <Route path= "/" element={<MainPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
