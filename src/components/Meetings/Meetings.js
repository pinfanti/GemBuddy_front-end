import "./Meetings.scss";
import React, { useState } from "react";
import question_icon from "../../assets/icons/question_mark.png";
import { Link } from "react-router-dom";
import arrow from "../../assets/icons/right_arrow.png";

function MainSelection({ meetings }) {
  const [tooltipText, setTooltipText] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleImageClick = (event, text) => {
    setTooltipText(text);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleRadioButtonChange = (event) => {
    setSelectedOption(event.target.value);
  };

  if (meetings) {
    return (
      <section className="meetings">
        <section className="meetings__header">
          <Link to={`/park/1`}> {/*I know it should not be hard coded just not had the time to get the id using the api and the parks table connected by the foreign keys*/}

              <img
                className="return_arrow"
                src={arrow}
                alt="Arrow back icon"
              />
            </Link>  
          <h1>Buddy ups</h1>
        </section>        
        <h3 className="meetings__info">
          We have two options of buddy-ups meetings that we offer. Please pick one.
        </h3>
        <label>
          <input className="meetings__option" type="radio" name="meetingType" value="Locals" onChange={handleRadioButtonChange} /> Buddy ups with locals.
          <img
            className="option_mark"
            src={question_icon}
            alt="Question Mark icon"
            onMouseEnter={(e) => handleImageClick(e, "Local people that organize meetings to show you hidden gems in the area, these meetings are charged local tours")}
            onMouseLeave={handleMouseLeave}
          />
        </label>
        <br />
        <label>
          <input className="meetings__option" type="radio" name="meetingType" value="Users" onChange={handleRadioButtonChange} /> Buddy ups organized by users.
          <img
            className="option_mark"
            src={question_icon}
            alt="Question Mark icon"
            onMouseEnter={(e) => handleImageClick(e, "Do you wanna connect with new people and discover a new place? That is your choice, with no charges.")}
            onMouseLeave={handleMouseLeave}
          />
        </label>
        <br />
        {showTooltip && (
          <div className="tooltip">
            <p>{tooltipText}</p>
          </div>
        )}

        {meetings && selectedOption === "Locals" && (
          <>
            <section>
              {meetings
                .filter((meeting) => meeting.receive_payment === 1)
                .map((meeting) => (
                  <div className="meeting" key={meeting.id}>
                    <section className="top-card">
                      <img
                      className="top-card__image"
                      src={`http://localhost:8080/${meeting.image}`}
                      alt="Person leading the meeting"
                      />
                      <section classname= "information">
                        <p classname= "information__name">Organizer: {meeting.first_name} {meeting.last_name}</p>
                        <p classname= "information__place">Place: {meeting.place}</p>
                        <p classname= "information__date">Date: {meeting.date}</p>
                        <p classname= "information__time">Starting Time: {meeting.hour}</p>
                        <p classname= "information__duration">Duration: Approximately half-day </p> {/*I know it should be a database information, but it is late to fix it now (next iteration I will do it)*/}
                        <p classname= "information__value">Value: ${meeting.value}</p>
                      </section> 
                      <section classname= "description">
                        <p classname= "description__gem">What we will be doing: {meeting.description_gem}</p>
                        <p classname= "description__meeting">Description: {meeting.description_meeting}</p>
                      </section>
                      <section classname= "button">
                        <button className="button__interested">Interested</button>
                        <button className="button__organizer">Know the Organizer</button>
                      </section>                     
                    </section> 
                  </div>
                ))}
            </section>
          </>
        )}

        {meetings && selectedOption === "Users" && (
          <>
            <section>
              {meetings
                .filter((meeting) => meeting.receive_payment !== 1)
                .map((meeting) => (
                  <div className="meeting" key={meeting.id}>
                    <section className="top-card">
                      <img
                      className="top-card__image"
                      src={`http://localhost:8080/${meeting.image}`}
                      alt=" Person leading the meeting"
                      />
                      <section classname= "information">
                        <p classname= "information__name">Organizer: {meeting.first_name} {meeting.last_name}</p>
                        <p classname= "information__place">Place: {meeting.place}</p>
                        <p classname= "information__date">Date: {meeting.date}</p>
                        <p classname= "information__time">Starting Time: {meeting.hour}</p>
                        <p classname= "information__duration">Duration: Approximately half-day </p> {/*I know it should be a database information, but it is late to fix it now (next iteration I will do it)*/}
                        <p classname= "information__value">Value: FREE</p>
                      </section> 
                      <section classname= "description">
                        <p classname= "description__gem">What we will be doing: {meeting.description_gem}</p>
                        <p classname= "description__meeting">Description: {meeting.description_meeting}</p>
                      </section>
                      <section classname= "button">
                        <button className="button__interested">Interested</button>
                        <button className="button__organizer">Know the Organizer</button>
                      </section>               
                    </section>                    
                  </div>
                ))}
            </section>
          </>
        )}
      </section>
    );
  } else {
    return (
      <section className="meetings">
        <p>No meetings data available.</p>
      </section>
    );
  }
}

export default MainSelection;



