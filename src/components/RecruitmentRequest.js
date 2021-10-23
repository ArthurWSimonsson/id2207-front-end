import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import './RecruitmentRequest.css'

import RecruitmentService from "../services/recruitment.service";

const RecruitmentRequest = (props) => {
    const [duration, setDuration] = useState("fulltime");
    const [department, setDepartment] = useState('administration');
    const [years, setYears] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const durationChange = (e) => {
        const duration = e.target.value;
        setDuration(duration);
    }

    const departmentChange = (e) => {
        const duration = e.target.value;
        setDepartment(duration);
    }

    const yearsChange = (e) => {
        const years = e.target.value;
        setYears(years);
    }

    const titleChange = (e) => {
        const title = e.target.value;
        setTitle(title);
    }

    const descriptionChange = (e) => {
        const description = e.target.value;
        setDescription(description);
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        RecruitmentService.storeRecruitmentRequest(duration, department, years, title, description).then(
            () => {
            props.history.push("/recruitmentRequest");
            window.location.reload();
            },
            (error) => {
                console.log('recruitment error', error)
            }
        );
    }

    return(
        <div className='container'>
            <h4 className="mb-3">Recruitment Request</h4>
            <Form onSubmit={onHandleSubmit}>
                <span>Contract type: </span>
                <div>     
                    <div className="form-check form-check-inline">
                        <input class="form-check-input" 
                               type="radio" 
                               name="duration" 
                               id="fullTime" 
                               value='fulltime' 
                               checked={duration === 'fulltime'}
                               onChange={durationChange}/>
                        <label class="form-check-label" for="fullTime">
                            Full time
                        </label>
                    </div>
                    <div className="form-check form-check-inline" id='partimeDiv'>
                        <input class="form-check-input" 
                               type="radio" 
                               name="duration" 
                               id="partTime"
                               value='parttime'
                               checked={duration === 'parttime'}
                               onChange={durationChange}/>
                        <label class="form-check-label" for="partTime">
                            Part time
                        </label>
                    </div>
                </div>
                <span>Department: </span>
                <div>
                    <div className="form-check form-check-inline">
                        <input class="form-check-input" 
                               type="radio" 
                               name="department" 
                               id="admin" 
                               value = 'administration'
                               checked={department === 'administration'}
                               onChange={departmentChange}/>
                        <label class="form-check-label" for="admin">
                            Administration
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input class="form-check-input" 
                               type="radio" 
                               name="department" 
                               id="services"
                               value='services'
                               checked = {department === 'services'}
                               onChange={departmentChange}/>
                        <label class="form-check-label" for="services">
                            Services
                        </label>
                    </div>
                </div>
                <div>
                    <div className="form-check form-check-inline">
                        <input class="form-check-input" 
                               type="radio" 
                               name="department" 
                               id="production"
                               value='production'
                               onChange={departmentChange}
                               checked={department==='production'}/>
                        <label class="form-check-label" for="production">
                            Production
                        </label>
                    </div>
                    <div className="form-check form-check-inline" id='financialDiv'>
                        <input class="form-check-input" 
                               type="radio" 
                               name="department" 
                               id="financial"
                               value='financial'
                               checked={department==='financial'}
                               onChange={departmentChange}/>
                        <label class="form-check-label" for="financial">
                            Financial
                        </label>
                    </div>
                </div>
                <div className="form-group row">
                    <label for="experience" className="col-sm-4 form-label">Years of experience:</label>
                    <div className="col-sm-4">
                        <input className="form-control-md" 
                               id="experience" 
                               autoComplete="off" 
                               value={years}
                               onChange={yearsChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label for="title" className="col-sm-4 form-label">Job Title:</label>
                    <div className="col-sm-4">
                        <input className="form-control-md" 
                               id="title" 
                               autoComplete="off"
                               value={title}
                               onChange={titleChange}/>
                    </div>
                </div>
                <div className="input-group">
                    <label for="jobDescription" className="col-sm-4 form-label">Job Description:</label>
                    <textarea id='jobDescription' 
                              className="form-control-md"
                              value={description}
                              onChange={descriptionChange}>
                    </textarea>
                </div>
                <button class="btn btn-primary" type="submit">Submit</button>
            </Form>
        </div>
    )
}

export default RecruitmentRequest