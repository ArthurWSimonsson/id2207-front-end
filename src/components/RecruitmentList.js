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
                return (
                    <div>
                        <li className="list-group-item">
                            <Link className="link-secondary text-decoration-none" 
                                to={{pathname :'/viewRecruitment', state :{recruitment: item}}}>
                                    {item.department}
                            </Link>
                            <span className="badge bg-secondary float-end">{item.status}</span>
                        </li>
                    </div>
                )
            })}
            </ul>
        </div>
    )
}

export default RecruitmentList;