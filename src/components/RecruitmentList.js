import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";

import RecruitmentService from "../services/recruitment.service";

const RecruitmentList = (props) => {
    const [recruitmentList, setRecruitmentList] = useState([]);

    useEffect (async() => {
        const list = await RecruitmentService.getRecruitmentList();
        setRecruitmentList(list);
    },[]) 

    return(
        <div className='container'>
            <ul className="list-group">
            {recruitmentList.map((item) => {
                let span;
                if (item.status === 'unhandled')
                    span = <span className="badge bg-secondary float-end">{item.status}</span>;
                else if (item.status === 'approved')
                    span = <span className="badge bg-success float-end">{item.status}</span>;
                else if (item.status === 'rejected') 
                    span = <span className="badge bg-danger float-end">{item.status}</span>;
                return (
                    <div>
                        <li className="list-group-item">
                            <Link className="link-secondary text-decoration-none" 
                                to={{pathname :'/recruitmentView', state :{recruitment: item}}}>
                                    {item.department} Title: {item.title}
                            </Link>
                            {span}
                        </li>
                    </div>
                )
            })}
            </ul>
        </div>
    )
}

export default RecruitmentList;