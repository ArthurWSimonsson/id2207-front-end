import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };


const InitialRequest = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [recordNumber, setRecordNumber] = useState("");
    const [clientName, setClientName] = useState("");
    const [eventType, setEventType] = useState("");
    const [attendees, setAttendees] = useState("");
    const [budget, setBudget] = useState("");
    const [decorations, setDecorations] = useState(false);
    const [parties, setParties] = useState(false);
    const [photos, setPhotos] = useState(false);
    const [food, setFood] = useState(false);
    const [drinks, setDrinks] = useState(false);
    
    const [message, setMessage] = useState("");

    const onChangeRecordNumber = (e) => {
        const recordNumber = e.target.value;
        setRecordNumber(recordNumber);
    }
    const onChangeClientName = (e) => {
        const clientName = e.target.value;
        setClientName(clientName);
    }
    const onChangeEventType = (e) => {
        const eventType = e.target.value;
        setEventType(eventType);
    }
    const onChangeAttendees = (e) => {
        const attendees = e.target.value;
        setAttendees(attendees);
    }

    const onChangeDecorations = (e) => {
        const decorations = e.target.value;
        setDecorations(decorations);
    }

    const onChangeParties = (e) => {
        const parties = e.target.value;
        setParties(parties);
    }

    const onChangePhotos = (e) => {
        const photos = e.target.value;
        setPhotos(photos);
    }

    const onChangeFood = (e) => {
        const food = e.target.value;
        setFood(food);
    }

    const onChangeDrinks = (e) => {
        const drinks = e.target.value;
        setDrinks(drinks);
    }

    const onChangeBudget = (e) => {
        const budget = e.target.value;
        setBudget(budget);
    }

    const handleLogin = () => {
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
              () => {
                props.history.push("/initial");
                window.location.reload();
              },
              (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
      
                setLoading(false);
                setMessage(resMessage);
              }
            );
          } else {
            setLoading(false);
          }
    }

    return(
        <div>
            <Form onSubmit={handleLogin} ref={form}>
                <div className="form-group">
                    <label htmlFor="recordNumber">Record Number</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="recordNumber"
                        value={recordNumber}
                        onChange={onChangeRecordNumber}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="clientName">Client Name</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="clientName"
                        value={clientName}
                        onChange={onChangeClientName}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventType">Event Type</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="eventType"
                        value={eventType}
                        onChange={onChangeEventType}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="attendees">Number of attendees</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="attendees"
                        value={attendees}
                        onChange={onChangeAttendees}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="decorations">Decorations</label>
                    <Input
                        type="checkbox"
                        name="decorations"
                        checked={decorations}
                        onChange={onChangeDecorations}
                    />
                    <label htmlFor="parties">Parties</label>
                    <Input
                        type="checkbox"
                        name="parties"
                        checked={parties}
                        onChange={onChangeParties}
                    />
                    <label htmlFor="photos">Photos/Filming</label>
                    <Input
                        type="checkbox"
                        name="photos"
                        checked={photos}
                        onChange={onChangePhotos}
                    />
                    <label htmlFor="food">Food</label>
                    <Input
                        type="checkbox"
                        name="food"
                        checked={food}
                        onChange={onChangeFood}
                    />
                    <label htmlFor="drinks">Drinks</label>
                    <Input
                        type="checkbox"
                        name="drinks"
                        checked={drinks}
                        onChange={onChangeDrinks}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="budget">Budget</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="budget"
                        value={budget}
                        onChange={onChangeBudget}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block">
                        <span>Submit</span>
                    </button>
                </div>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
    )
}

export default InitialRequest;