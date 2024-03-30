import './App.scss';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import ParkPage from "./pages/ParkPage/ParkPage";
import MeetingsPage from "./pages/MeetingsPage/MeetingsPage";
import AddMeetingsPage from "./pages/AddMeetingPage/AddMeetingPage";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <p className="welcome" >Welcome Priscila</p>
      <div className="layout">        
        <Routes>
          <Route path= "/" element={<MainPage/>}/>
          <Route path="/park/:id" element ={<ParkPage/>}/>
          <Route path="/meetings/:id" element ={<MeetingsPage/>}/> 
          <Route path="/addmeetings/:id" element ={<AddMeetingsPage/>}/>      
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
