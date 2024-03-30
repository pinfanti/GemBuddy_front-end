import React from "react";
import "./MeetingsPage.scss";
import Meetings from "../../components/Meetings/Meetings";
import { useState, useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router-dom"

const MeetingsPage = () => {
  const [meetings, setMeetings]  = useState({});  
  const { id } = useParams()
    
  useEffect(() => {
    const getMeetings = async () => {
      try {
        const response = await axios.get(
            `http://localhost:8080/api/meetings/${id}`
        );
        setMeetings(response.data);
      }
      catch (error) {
        console.error("There was an error fetching meetings: ", error);
      }
    };

    getMeetings();

  }, [id]); 
   
    return(        
        <section>
            <Meetings meetings = {meetings} />
        </section>         
    )
}
export default MeetingsPage; 
