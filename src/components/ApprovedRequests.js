import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";

import RequestService from "../services/request.service";

const ApprovedRequests = (props) => {
    const [list, setList] = useState([]);

    useEffect (async () => {
        const list = await RequestService.getInitialRequestList();
        setList(list);
    },[]);

    let content = [];

    for (const item of list) {
        if (item.currentResponsible === 'AdministrationManager') {
            content.push(
                <li className="list-group-item">
                    <Link className="link-secondary" to={{ pathname: '/initial', state: { record: item} }}>{item.recordNumber}</Link>
                </li>
            )
        }
    }

    return (
        <div className='container'>
            <ul className='list-group'>
                {content}
            </ul>
        </div>
    )
}

export default ApprovedRequests;