import "./InterestedPage.scss";
import React from "react";
import InterestedForm from "../../components/InterestedForm/InterestedForm";
import { useState, useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router-dom"
import {useNavigate } from "react-router-dom";


function InterestedPage() {

    const [meeting, setMeeting]  = useState({}); 
    const navigate = useNavigate(); 
    const { id } = useParams()
      
    useEffect(() => {
      const getMeeting = async () => {
        try {
          const response = await axios.get(
              `http://localhost:8080/api/meetings/meeting/${id}`
          );
          setMeeting(response.data);
        }
        catch (error) {
          console.error("There was an error fetching meeting: ", error);
        }
      };
  
      getMeeting();
  
    }, [id]); 

    async function handleSubmit() {
      setTimeout(() => {
        navigate(`/meetings/1`);//hardcoded because I did not have time to grab the park id to include here and it will be done in the future.
    }, 4000);


    }

       return (
        <>
        <InterestedForm onSubmit={handleSubmit} meeting = {meeting} />
        </>
    );
}

export default InterestedPage;