import "./AddMeetingPage.scss";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import AddMeetingForm from "../../components/AddMeetingForm/AddMeetingForm";
import { useParams } from "react-router-dom";
import { useState } from "react";


function AddMeetingPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(meeting) {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `http://localhost:8080/api/meetings/${id}`,
                meeting
            );
            console.log(response);

            // Delay navigation by 3 seconds
            setTimeout(() => {
                navigate(`/meetings/${id}`);
            }, 3000);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(true);
        }
    }

    return (
        <>
            <AddMeetingForm onSubmit={handleSubmit} isLoading={isLoading} />
        </>
    );
}

export default AddMeetingPage;