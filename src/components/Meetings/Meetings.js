import "./Meetings.scss";
import React, { useState } from "react";
import info from "../../assets/icons/info_icon.png";
import { Link, useParams } from "react-router-dom";
import arrow from "../../assets/icons/right_arrow.png";

function Meetings({ meetings }) {
  const { id } = useParams();
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

  // Function to convert ISO date string to YYYY-MM-DD format
  function convertISOToYYYYMMDD(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  const card = (meeting) => {
    //I understand I shoud have the logic related with the login and the user should be dynamic, but this is for a future implementation.
    return (
      <div className="meeting" key={meeting.id}>
        {meeting.user_id === 10 && (
          <section className="delete">
            <p className="delete__option">Delete</p>
          </section>
        )}
        <section className="top-card">
          <img
            className="top-card__image"
            src={`http://localhost:8080/${meeting.image}`}
            alt="Person leading the meeting"
          />
          <section className="information">
            <p className="information__name">
              <strong>
                {meeting.first_name} {meeting.last_name}
              </strong>
            </p>
            <p className="information__place">
              <strong>Place:</strong> {meeting.place}
            </p>
            <p className="information__date">
              <strong>Date:</strong>{" "}
              {convertISOToYYYYMMDD(meeting.date)}
            </p>
            <p className="information__time">
              <strong>Starting Time:</strong> {meeting.hour} am
            </p>
            <p className="information__duration">
              <strong>Duration:</strong> Approximately half-day
            </p>
            <p className="information__value">
              <strong>Value:</strong>{" "}
              {meeting.value ? `$${meeting.value}` : "FREE"}
            </p>
          </section>
        </section>
        <section className="description">
          <p>
            <strong>What we will be doing:</strong>
          </p>
          <p className="description__gem">{meeting.description_gem}</p>
          <p>
            <strong>Description:</strong>
          </p>
          <p className="description__meeting">{meeting.description_meeting}</p>
        </section>
        <section className="buttons">
          <button className="buttons__interested">Interested</button>
          <button className="buttons__organizer"> Organizer</button>
        </section>
      </div>
    );
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
          We have two options of buddy-ups meetings that we offer. Please pick
          one.
        </h3>
        <section className="selectors">
          <label>
            <input
              className="meetings__option"
              type="radio"
              name="meetingType"
              value="Locals"
              onChange={handleRadioButtonChange}
            />{" "}
            <label className="meetings__label">Buddy ups with locals.</label>
            <img
              className="option_mark"
              src={info}
              alt="Information icon"
              onMouseEnter={(e) =>
                handleImageClick(
                  e,
                  "Local people that organize meetings to show you hidden gems in the area, these meetings are charged local tours"
                )
              }
              onMouseLeave={handleMouseLeave}
            />
          </label>
          <br />
          <label>
            <input
              className="meetings__option"
              type="radio"
              name="meetingType"
              value="Users"
              onChange={handleRadioButtonChange}
            />
            <label className="meetings__label"> Buddy ups organized by users.</label>
            <img
              className="option_mark"
              src={info}
              alt="Information icon"
              onMouseEnter={(e) =>
                handleImageClick(
                  e,
                  "Do you wanna connect with new people and discover a new place? That is your choice, with no charges."
                )
              }
              onMouseLeave={handleMouseLeave}
            />
          </label>
          <br />
        </section>
        <section className="new-meeting">
          <Link to={`/addmeetings/${id}`}>
            <button className="button__add">+ New Meeting</button>
          </Link>
        </section>
        {showTooltip && (
          <div className="tooltip">
            <p>{tooltipText}</p>
          </div>
        )}

        {meetings && selectedOption === "" && Array.isArray(meetings) && (
          <section className="wrapper-meetings">
            {meetings.map((meeting) => card(meeting))}
          </section>
        )}

        {meetings && selectedOption === "Locals" && (
          <section className="wrapper-meetings">
            {meetings
              .filter((meeting) => meeting.receive_payment === 1)
              .map((meeting) => card(meeting))}
          </section>
        )}

        {meetings && selectedOption === "Users" && (
          <section className="wrapper-meetings">
            {meetings
              .filter((meeting) => meeting.receive_payment !== 1)
              .map((meeting) => card(meeting))}
          </section>
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

export default Meetings;
