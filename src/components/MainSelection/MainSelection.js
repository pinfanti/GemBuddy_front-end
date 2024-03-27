import "./MainSelection.scss";
import React from "react";
import { Link } from "react-router-dom";

function MainSelection({ parks }) {
  if (parks) {
    return (
      <section className="selection">
        <h3 className="selection__info">
          The Rockies are Canada's crown jewel, some even say the world's! Please select one of the areas of the rocky mountains that you intend to visit and the date.
        </h3>
        <section className="cards">
          {parks.map((park) => (
            <section className="card_main" key={park.id}>
              <Link to={`/park/${park.id}`} className="card__link">
                <img src={`http://localhost:8080/${park.image}`} alt={park.park_name} />
                {park.park_name}
              </Link>
            </section>
          ))}
        </section>
      </section>
    );
  } else {
    return null;
  }
}

export default MainSelection;

