import "./Organizer.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/icons/right_arrow.png";

function ErrorRequiredMessage() {
  return <p className="meeting-form__error">This field is required</p>;
}

function Organizer({ meeting, onSubmit }) {
  const [showForm, setShowForm] = useState(false);
  const [missing, setMissing] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  function handleImageLoad() {
    setImageLoaded(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const contactData = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      email: event.target.email.value,
      title: event.target.title.value,
      question: event.target.question.value,
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
    if (!contactData.title) {
      setMissing((state) => ({ ...state, title: true }));
    }
    if (!contactData.question) {
      setMissing((state) => ({ ...state, question: true }));
    }

    // Check if all required fields are filled
    if (Object.values(contactData).every((val) => val)) {
      onSubmit();
      setSubmitted(true); // Update form submission status
    }
  }

  return (
    <>
      <section className="top">
        <Link to={`/meetings/${meeting.activity_id}`} className="top_link">
          <img className="return_arrow" src={arrow} alt="Arrow back icon" />
        </Link>
        <h1 className="form__title"> Organizer Information </h1>
      </section>
      {!showForm && (
        <>
          <section className="organizer">
            <img
              className="organizer__image"
              src={`http://localhost:8080/${meeting.image}`}
              alt="Person leading the meeting"
              onLoad={handleImageLoad}
            />
            {imageLoaded && (
            <section className="organizer-info">
              <section className="organizer-info__wrapper">
                <h1 className="organizer-info__wrapper--name">
                  {meeting.first_name} {meeting.last_name}
                </h1>
              </section>
              <section className="organizer-info__wrapper2">
                <h3 className="organizer-info__wrapper2--description">
                  {meeting.description}
                </h3>
              </section>
            </section>
            )}
          </section>
          <section className="inquires">
            <p className="inquires__explanation">
              If you have any inquiries, questions, or concerns for the
              organizer, click the contact button. The organizer normally
              responds quickly (same-day reply).
            </p>
            <section className="button-area">
              <button
                className="button-area__inquires"
                onClick={() => setShowForm(true)}
              >
                Contact
              </button>
            </section>
          </section>
        </>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
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

            <label htmlFor="title" className="fields__label">
              What is the reason to make contact?
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={missing.title ? "input--invalid" : "input"}
              placeholder="Ex: Question x"
            />
            {missing.title && <ErrorRequiredMessage />}

            <label htmlFor="question" className="fields__label">
              Please provide any additional information here!
            </label>
            <input
              id="question"
              name="question"
              className={missing.question ? "textarea--invalid" : "textarea"}
              placeholder="Ex: How many people is the group?"
            />
            {missing.question && <ErrorRequiredMessage />}

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
        </form>
      )}
    </>
  );
}

export default Organizer;
