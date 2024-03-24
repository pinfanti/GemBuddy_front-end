import MainSelection from "../../components/MainSelection/MainSelection";
import "./MainPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";

function MainPage() {

  const [parks, setParks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const apiParks = `http://localhost:8080/api/parks`;
    const fetchParks = async () => {
      try {
          const response = await axios.get(apiParks);            
          setParks(response.data);
          setIsLoading(false);
      }
      catch (error) {
          setIsLoading(false);
          setHasError(true);
      }
  }

  fetchParks();

  },[]);

  if (hasError) {
    return <p>Error loading Parks. Please try again later</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return(
        <section className="mainPage">
            <MainSelection parks = {parks}/>
        </section>
      ) 
}

export default MainPage;