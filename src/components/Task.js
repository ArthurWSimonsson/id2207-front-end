import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import RequestService from "../services/request.service";


const Task = () => {
    const [requestList, setRequestList] = useState([]);
    const [description, setDescription] = useState("");
    const [recordNumber, setRecordNumber] = useState("");
    const [assignee, setAssignee] = useState("");
    const [priority, setPriority] = useState("");

    useEffect (async () => {
        const list = await RequestService.getInitialRequestList();
        setRequestList(list);
    }, []);

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('e', e.target.value);
    }

    const onChangeRecordNumber = (e) => {
        const recordNumber = e.target.value;
        setRecordNumber(recordNumber);
    }

    const onChangeAssign = (e) => {
        const assignee = e.target.value;
        setAssignee(assignee);
    }

    const onChangePriority = (e) => {
        const priority = e.target.value;
        setPriority(priority)
    }

    const names = [
        {
            name: 'Magy'
        },
        {
            name: 'Angelina'
        }
    ]

    const priorities = [
        {
            name: 'High'
        },
        {
            name: 'Medium'
        },
        {
            name: 'Low'
        },
    ]

    return(
        <div className='container'>
        <h4 class="mb-3">Task Distribution</h4>
            <Form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="recordNumber">Record Number</label>
                    <select className="form-select" onChange={onChangeRecordNumber}>
                        {requestList.map((item) => 
                            <option value={item.recordNumber}>{item.recordNumber}</option>
                        )}
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor="recordNumber">Description</label>
                        <Input
                            type="text"
                            className="form-control input-lg"
                            name="recordNumber"
                            value={description}
                            onChange={onChangeDescription}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="recordNumber">Assign too:</label>
                    <select className="form-select" onChange={onChangeAssign}>
                        {names.map((item) => 
                            <option value={item.name}>{item.name}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="recordNumber">Priority</label>
                    <select className="form-select" onChange={onChangePriority}>
                        {priorities.map((item) =>
                            <option value={item.name}>{item.name}</option>
                        )}   
                    </select>
                </div>
                <div>
                    <button className="btn btn-primary btn-block">Send Task</button>
                </div>
            </Form>
        </div>
    );
}

export default Task;