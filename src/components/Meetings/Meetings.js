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
    const { top, left } = event.target.getBoundingClientRect();
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
          <Link to={`/park/1`}>
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

        {selectedOption === "Locals" && (
          <>
            <section>
              {meetings
                .filter((meeting) => meeting.receive_payment === 1)
                .map((meeting) => (
                  <div className="meeting" key={meeting.id}>
                    <p>{meeting.place}</p>
                    {/* Render other meeting information */}
                  </div>
                ))}
            </section>
          </>
        )}

        {selectedOption === "Users" && (
          <>
            <h3>Buddy Up with other Users</h3>
            <section>
              {meetings
                .filter((meeting) => meeting.receive_payment !== 1)
                .map((meeting) => (
                  <div className="meeting" key={meeting.id}>
                    <section className="top_card">
                      <p>{meeting.place}</p>
                    </section>                    
                  </div>
                ))}
            </section>
          </>
        )}
      </section>
    );
  } else {
    return null;
  }
}

export default MainSelection;



