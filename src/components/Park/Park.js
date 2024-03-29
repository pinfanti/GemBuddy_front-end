import "./Park.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import arrow from "../../assets/icons/right_arrow.png";

function Park({ park }) {
  const { id } = useParams();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/activities/${id}`
        );
        setActivities(response.data);
      } catch (error) {
        console.error("There was an error fetching park: ", error);
      }
    };

    getActivities();
  }, [id]);

  if (park) {
    return (
      <section className="park">
        <section className="park__header">
          <Link to={`/`}>
            <img
              className="return_arrow"
              src={arrow}
              alt="Arrow back icon"
            />
          </Link>          
          <h1 className="park__header--tittle">
            {park.park_name} - {park.city} - {park.country}
          </h1>
        </section>        
        <h3 className="park__description">{park.description}</h3>
        <h3 className="park__description">Please, select which kind of places or activities you are looking for that we have locals and/or travellers allocated in the area offering Hidden Gem Meet-ups or Services.</h3>
        <section className="cards">
          {activities.map((activity) => (
            <section className="card" key={activity.id}>
              <Link to={`/meetings/${activity.id}`} className="card__link">
                <img
                  src={`http://localhost:8080/${activity.image}`}
                  alt={activity.activitie}
                />
                {activity.activitie}
              </Link>
            </section>
          ))}
        </section>
      </section>
    );
  } else {
    return null; // or render a loading spinner or placeholder
  }
}

export default Park;
