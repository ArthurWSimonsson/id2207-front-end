import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import TaskService from "../services/task.service";
import RequestService from "../services/request.service";
import AuthService from "../services/auth.service";


const Task = (props) => {
    const [requestList, setRequestList] = useState([]);
    const [description, setDescription] = useState("");
    const [recordNumber, setRecordNumber] = useState("");
    const [assigneeDecorations, setAssigneeDecorations] = useState("");
    const [assigneeChef, setAssigneeChef] = useState("");
    const [priority, setPriority] = useState("");
    const [showDecoration, setShowDecoration] = useState(false)
    const [showChef, setShowChef] = useState(false)
    const [showProduction, setShowProduction] = useState(false)
    const [showService, setShowService] = useState(false)
    const [department, setDepartment] = useState("")

    useEffect (async () => {
        const list = await RequestService.getInitialRequestList();
        const user = AuthService.getCurrentUser();
        if (user.role === 'ProductionManager') {
            setShowProduction(true);
            setDepartment('Production');
        }
        else if (user.role === 'ServiceManager'){
            setShowService(true);
            setDepartment('Service');
        }
        setRequestList(list);
        setRecordNumber(list[0].recordNumber);
        setAssigneeDecorations(namesDecorations[0].name);
        setAssigneeChef(namesChef[0].name);
        setPriority(priorities[0].name);
    }, []);

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    }

    const handleSubmit = (e) => {
        let assignee;
        department === 'Service' ? assignee = assigneeChef : assignee = assigneeDecorations;
        TaskService.storeTask(recordNumber, description, assignee, priority, department).then(
            () => {
            props.history.push("/task");
            window.location.reload();
            },
            (error) => {
                console.log('task error', error)
            }
        );
    }

    const onChangeRecordNumber = (e) => {
        const recordNumber = e.target.value;
        setRecordNumber(recordNumber);
    }

    const onChangeAssignDecorations = (e) => {
        const assignee = e.target.value;
        setAssigneeDecorations(assignee);
    }

    const onChangeAssignChef = (e) => {
        const assignee = e.target.value;
        setAssigneeChef(assignee);
    }

    const onChangePriority = (e) => {
        const priority = e.target.value;
        setPriority(priority)
    }

    const namesDecorations = [
        {
            name: 'Magy'
        },
        {
            name: 'Angelina'
        }
    ]

    const namesChef = [
        {
            name: 'Patrick'
        },
        {
            name: 'Erika'
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

    const handleDecorationDiv = () => {
        setShowDecoration(!showDecoration);
    }

    const handleChef = () => {
        setShowChef(!showChef);
    }

    return(
        <div className='container'>
            <h4 className="mb-3">Task Distribution</h4>
            {showProduction && (
            <div>
                <button className="btn btn-outline-secondary" onClick={handleDecorationDiv}>
                    Decorations
                </button>
            </div>
            )}
            {showService && (
            <div>
                <button className="btn btn-outline-secondary" onClick={handleChef}>
                    Chef
                </button>
            </div> 
            )}
            {showDecoration && (
            <div>
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
                    <select className="form-select" onChange={onChangeAssignDecorations}>
                        {namesDecorations.map((item) => 
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
            )}
            {showChef && (
            <div>
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
                    <select className="form-select" onChange={onChangeAssignChef}>
                        {namesChef.map((item) => 
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
            )}
        </div>
    );
}

export default Task;