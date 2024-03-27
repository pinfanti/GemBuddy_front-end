import "./Park.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

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
        <h1 className="park__title">
          {park.park_name} - {park.city} - {park.country}
        </h1>
        <h3 className="park__description">{park.description}</h3>
        <section className="cards">
          {activities.map((activity) => (
            <section className="card" key={activity.id}>
              <Link to={`/park/${activity.id}`} className="card__link">
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
