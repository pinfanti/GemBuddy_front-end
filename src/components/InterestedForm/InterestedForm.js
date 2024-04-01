import "./InterestedForm.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/icons/right_arrow.png";
import { useParams } from "react-router-dom";

function ErrorRequiredMessage() {
  return <p className="meeting-form__error">This field is required</p>;
}

function InterestedForm({ meeting, onSubmit }) {    
  const { id } = useParams();
  const [missing, setMissing] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!meeting) {
    meeting = {};
  }

  function convertISOToYYYYMMDD(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const contactData = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      email: event.target.email.value,
      more_info: event.target.more_info.value,
    };

    // Reset previous validation state
    setMissing({});

    if (!contactData.first_name) {
      setMissing((state) => ({ ...state, first_name: true }));
    }
    if (!contactData.last_name) {
      setMissing((state) => ({ ...state, last_name: true }));
    }
    if (!contactData.email) {
      setMissing((state) => ({ ...state, email: true }));
    }
    if (!contactData.more_info) {
      setMissing((state) => ({ ...state, more_info: true }));
    }

    // Check if all required fields are filled
    if (Object.values(contactData).every((val) => val)) {
      onSubmit();
      setSubmitted(true); // Update form submission status
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="interested-form">
        <div className="form">
          <section className="top">
            <Link to={`/meetings/${meeting.activity_id}`} className="top_link">
              <img className="return_arrow" src={arrow} alt="Arrow back icon" />
            </Link>
            <h1 className="form__title"> Interest Form </h1>
          </section>
          <h3 className="meetings__info">
            We are happy to see that you are interested in this meeting. Let's
            contact the organizer to arrange the details of your buddy up.
            Organizers are usually very quick to reply (less than 24 hours).
          </h3>
          <section className="meeting-info">
            <h4>
              You have selected the {meeting.place} meeting. This buddy up will
              happen on {convertISOToYYYYMMDD(meeting.date)} at {meeting.hour}.{" "}
            </h4>
            <h4>
              Please, provide the organizer few informations to help you guys to
              buddy up.{" "}
            </h4>
          </section>
          <section className="fields">
            <label htmlFor="first_name" className="fields__label">
              What is your first name?
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className={missing.first_name ? "input--invalid" : "input"}
              placeholder="Ex: John"
            />
            {missing.first_name && <ErrorRequiredMessage />}

            <label htmlFor="last_name" className="fields__label">
              What is your last name?
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className={missing.last_name ? "input--invalid" : "input"}
              placeholder="Ex: Doe"
            />
            {missing.last_name && <ErrorRequiredMessage />}

            <label htmlFor="email" className="fields__label">
              What is your email?
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className={missing.email ? "input--invalid" : "input"}
              placeholder="Ex: example@gembuddy.com"
            />
            {missing.email && <ErrorRequiredMessage />}

            <label htmlFor="more_info" className="fields__label">
              Please provide any additional information here!
            </label>
            <input
              id="more_info"
              name="more_info"
              className={missing.more_info ? "textarea--invalid" : "textarea"}
              placeholder="Ex: I would like to have my friend Joe with me as well."
            />
            {missing.more_info && <ErrorRequiredMessage />}

           {submitted && Object.values(missing).every((val) => !val) && (
              <p className="meeting-form__success">
                You have Successfully contacted the organizer that will soon
                contact you back!
              </p>
            )}

            <footer className="footer">
              <Link to={`/meetings/${meeting.activity_id}`}>
                <button className="footer__button">Cancel</button>
              </Link>
              <button type="submit" className="footer__button">
                Submit
              </button>
            </footer>
          </section>
        </div>
      </div>
    </form>
  );
}

export default InterestedForm;
