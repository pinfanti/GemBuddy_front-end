import './App.scss';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import ParkPage from "./pages/ParkPage/ParkPage";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="layout">        
        <Routes>
          <Route path= "/" element={<MainPage/>}/>
          <Route path="/park/:id" element ={<ParkPage/>}/>   
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
