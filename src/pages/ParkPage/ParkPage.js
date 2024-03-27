import "./ParkPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router-dom"
import Park from "../../components/Park/Park"

const ParkPage = () => {
  const [park, setPark]  = useState({});  
  const { id } = useParams()
    
  useEffect(() => {
    const getPark = async () => {
      try {
        const response = await axios.get(
            `http://localhost:8080/api/parks/${id}`
        );
        setPark(response.data);
      }
      catch (error) {
        console.error("There was an error fetching park: ", error);
      }
    };

    getPark();

  }, [id]); 
    /*Returns the components that will be presented on screen with the props */
    return(        
        <section>
            <Park park = {park} />
        </section>         
    )
}
export default ParkPage; 