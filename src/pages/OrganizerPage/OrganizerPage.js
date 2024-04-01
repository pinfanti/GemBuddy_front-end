import "./OrganizerPage.scss";
import React, { useState, useEffect } from "react";
import Organizer from "../../components/Organizer/Organizer";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function OrganizerPage() {
  const [meeting, setMeeting] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getMeeting = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/meetings/meeting/${id}`
        );
        setMeeting(response.data);
      } catch (error) {
        console.error("There was an error fetching meeting: ", error);
      }
    };

    getMeeting();
  }, [id]);

  async function handleSubmit() {
    setTimeout(() => {
      navigate(`/meetings/${meeting.activity_id}`);
    }, 4000);
  }

  return (
    <>
      {meeting && (
        <Organizer onSubmit={handleSubmit} meeting={meeting} />
      )}
    </>
  );
}

export default OrganizerPage;
