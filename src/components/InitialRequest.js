import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import RequestService from "../services/request.service";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };


const InitialRequest = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [recordNumber, setRecordNumber] = useState(props.location.state? props.location.state.record.recordNumber: "number");
    const [clientName, setClientName] = useState(props.location.state? props.location.state.record.clientName: "name");
    const [eventType, setEventType] = useState(props.location.state? props.location.state.record.eventType: "type");
    const [attendees, setAttendees] = useState(props.location.state? props.location.state.record.attendees: 1);
    const [budget, setBudget] = useState(props.location.state? props.location.state.record.budget: "1000 SEK");
    const [decorations, setDecorations] = useState(props.location.state? props.location.state.record.decorations: false);
    const [parties, setParties] = useState(props.location.state? props.location.state.record.parties: false);
    const [photos, setPhotos] = useState(props.location.state? props.location.state.record.photos: false);
    const [food, setFood] = useState(props.location.state? props.location.state.record.food: false);
    const [drinks, setDrinks] = useState(props.location.state? props.location.state.record.drinks: false);
    const [responsible, setResponsible] = useState(props.location.state? props.location.state.record.currentResponsible: false);
    
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(undefined);

    

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if(user) {
            setCurrentUser(user);
        }
    }, [])


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
        setDecorations(!decorations);
    }

    const onChangeParties = (e) => {
        setParties(!parties);
    }

    const onChangePhotos = (e) => {
        setPhotos(!photos);
    }

    const onChangeFood = (e) => {
        setFood(!food);
    }

    const onChangeDrinks = (e) => {
        setDrinks(!drinks);
    }

    const onChangeBudget = (e) => {
        const budget = e.target.value;
        setBudget(budget);
    }

    const rejectHandle = async (e) => {
        e.preventDefault();
        console.log('reject')
        RequestService.deleteInitialRequest(recordNumber);
        props.history.push('/list');
        window.location.reload();
    }

    let button;

    if (responsible === 'AdministrationManager') {
        button = <div>Approved</div>
    }
    else if (currentUser && currentUser.role == 'CustomerOfficer') {
        button =                     
            <button className="btn btn-primary btn-block">
                <span>Submit</span>
            </button>
    }
    else if (currentUser && (currentUser.role === 'SeniorCustomerOfficer' ||
                             currentUser.role === 'AdministrationManager')){
        button =              
        <div>
            <button className="btn btn-primary btn-block" type='submit'>
                <span>Update</span>
            </button>
            <button id='reject-button' className="btn btn-danger btn-block float-end" onClick={rejectHandle}>
                <span>Reject</span>
            </button>
        </div>       
    }
    else {
        button =              
        <div>
            <button className="btn btn-primary btn-block" type='submit'>
                <span>Update</span>
            </button>
        </div> 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        form.current.validateAll();

        if (currentUser.role === 'CustomerOfficer' && checkBtn.current.context._errors.length === 0) {
            RequestService.storeInitialRequest(recordNumber, clientName, eventType, attendees, 
                budget, decorations, parties, photos, food, drinks, currentUser.role).then(
              () => {
                props.history.push("/initial");
                window.location.reload();
              },
              (error) => {
                const resMessage =
                
                    error.response.data;
                console.log(error.response);
                setMessage(resMessage);
              }
            );
          }
          else if ((currentUser.role === 'SeniorCustomerOfficer' || 
                    currentUser.role === 'FinancialManager' || 
                    currentUser.role === 'AdministrationManager') && 
                    checkBtn.current.context._errors.length === 0) {
            console.log('testing')
            props.history.push("/list");
            window.location.reload();
            RequestService.updateInitialRequest(props.location.state.record._id, recordNumber, clientName, eventType, attendees, 
                budget, decorations, parties, photos, food, drinks, currentUser.role).then(
              () => {
                props.history.push("/list");
                window.location.reload();
              },
              (error) => {
                const resMessage =
                error.message;

                console.log('error', error)
      
                setMessage(resMessage);
              }
            );
        }
    }

    return(
        <div className='container'>
            <h4 className="mb-3">Initial Request</h4>
            <Form onSubmit={handleSubmit} ref={form}>
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
                    {button}
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