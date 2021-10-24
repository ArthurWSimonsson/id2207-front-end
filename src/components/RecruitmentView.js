import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";

import RecruitmentService from "../services/recruitment.service";
import AuthService from "../services/auth.service";

const RecruitmentView = (props) => {
    const [duration, setDuration] = useState("");
    const [department, setDepartment] = useState("");
    const [years, setYears] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [user, setUser] = useState(undefined);

    useEffect (async() => {
        setUser(AuthService.getCurrentUser);
        setDuration(props.location.state.recruitment.duration);
        setDepartment(props.location.state.recruitment.department);
        setYears(props.location.state.recruitment.years);
        setTitle(props.location.state.recruitment.title);
        setDescription(props.location.state.recruitment.description);
        setStatus(props.location.state.recruitment.status);
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();

        RecruitmentService.changeRecruitmentStatus(props.location.state.recruitment._id, status).then(
            () => {
            props.history.push("/recruitmentList");
            window.location.reload();
            },
            (error) => {
                console.log('recruitment error', error);
            }
        );
    }

    const statusChange = (e) => {
        const status = e.target.value;
        setStatus(status);
    }

    let content;

    if (user && user.role === 'HR') {
        content =             
            <Form onSubmit={handleSubmit}>
                <select className='form-select' value={status} onChange={statusChange}>
                    <option value='approved'>Approved</option>
                    <option value='rejected'>Rejected</option>
                    <option value='unhandled'>Unhandled</option>
                </select>
                <button type='submit' className='btn btn-primary'>
                    Update
                </button>
            </Form>
    }
    else if (user && (user.role === 'ServiceManager' ||
                      user.role === 'ProductionManager')) {
        content = <ul className ='list-group'>
                    <li className ='list-group-item'>{status}</li>
                  </ul>                 
        }

    return(
        <div className='container'>
            <ul className='list-group'>
                <li className='list-group-item'>
                    Job Title: {title}
                </li>
                <li className='list-group-item'>
                    Years of experience: {years}
                </li>
                <li className='list-group-item'>
                    Department: {department}
                </li>
                <li className='list-group-item'>
                    Duration: {duration}
                </li>
                <li className='list-group-item'>
                    Description: {description}
                </li>
            </ul>
            {content}
        </div>
    )
}

export default RecruitmentView;