import { useState } from "react";
import "./AddMeetingForm.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import arrow from "../../assets/icons/right_arrow.png";

function ErrorRequiredMessage() {
  return <p className="meeting-form__error">This field is required</p>;
}

function MeetingForm({ onSubmit, meeting, isLoading }) {
  const [missing, setMissing] = useState({});
  const { id } = useParams();

  if (!meeting) {
    meeting = {};
  }

  function handleSubmit(event) {
    event.preventDefault();

    const meetingData = {
      user_id: 10, // Hardcoded for presentation
      place: event.target.place.value,
      date: event.target.date.value,
      hour: event.target.time.value,
      receive_payment: 1, // Hardcoded for now
      value: 50.00, // Hardcoded for now
      description_gem: event.target.description_gem.value,
      description_meeting: event.target.description_meeting.value,
      activity_id: id,
    };

    // Reset previous validation state
    setMissing({});

    if (!meetingData.place) {
      setMissing((state) => ({ ...state, place: true }));
    }
    if (!meetingData.date) {
      setMissing((state) => ({ ...state, date: true }));
    }
    if (!meetingData.description_gem) {
      setMissing((state) => ({ ...state, description_gem: true }));
    }
    if (!meetingData.description_meeting) {
      setMissing((state) => ({ ...state, description_meeting: true }));
    }

    onSubmit(meetingData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="meeting-form">
        <div className="form">
          <section className="top">
            <Link to={`/meetings/${id}`} className="top_link">
              <img
                className="return_arrow"
                src={arrow}
                alt="Arrow back icon"
              />
            </Link>
            <h1 className="form__title"> + Add a New Meeting </h1>
          </section>
          <section className="fields">
            <label htmlFor="place" className="fields__label">
              Where will the meeting be?
            </label>
            <input
              type="text"
              id="place"
              name="place"
              className={missing.place ? "input--invalid" : "input"}
              defaultValue={meeting.place}
            />
            {missing.place && <ErrorRequiredMessage />}

            <label htmlFor="date" className="fields__label">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className={missing.date ? "input--invalid" : "input"}
              defaultValue={meeting.date}
            />
            {missing.date && <ErrorRequiredMessage />}

            <label className="fields__time">Time</label>
            <input
            name="time"
            type="time"    
            className={missing.time ? "meeting__invalid" : "input"}
            defaultValue={meeting.time}
            />
            {missing.time && <ErrorRequiredMessage />}


            <label htmlFor="description_gem" className="fields__label">
              Buddy up description:
            </label>
            <textarea
              id="description_gem"
              name="description_gem"
              className={
                missing.description_gem ? "textarea--invalid" : "textarea"
              }
              defaultValue={meeting.description_gem}
            />
            {missing.description_gem && <ErrorRequiredMessage />}

            <label
              htmlFor="description_meeting"
              className="fields__label"
            >
              Why do you consider this place a hidden gem, and describe the meeting activities:
            </label>
            <textarea
              id="description_meeting"
              name="description_meeting"
              className={
                missing.description_meeting
                  ? "textarea--invalid"
                  : "textarea"
              }
              defaultValue={meeting.description_meeting}
            />
            {missing.description_meeting && <ErrorRequiredMessage />}
            {isLoading && (
              <p className="meeting-form__success">
                Meeting Successfully Added!
              </p>
            )}

            <footer className="footer">
              <Link to={`/meetings/${id}`}>
                <button className="footer__button">
                  Cancel
                </button>
              </Link>
              <button className="footer__button">
                Submit
              </button>
            </footer>
          </section>
        </div>
      </div>
    </form>
  );
}

export default MeetingForm;
