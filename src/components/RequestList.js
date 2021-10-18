import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";

import RequestService from "../services/request.service";
import AuthService from "../services/auth.service";


const RequestList = (props) => {

    const [requestList, setRequestList] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect (async () => {
        const list = await RequestService.getInitialRequestList();
        const user = AuthService.getCurrentUser();
        if(user) {
            setCurrentUser(user);
        }
        setRequestList(list);
    }, []);

    let list = [];

    if (currentUser && currentUser.role == 'SeniorCustomerOfficer') {
        for(const item of requestList) {
            if (item.currentResponsible == 'CustomerOfficer') {
                list.push(                
                <li className="list-group-item">
                    <Link className="link-secondary" to={{ pathname: '/initial', state: { record: item} }}>{item.recordNumber}</Link>
                </li>)
            }
        }
    }
    else if (currentUser && currentUser.role == 'FinancialManager') {
        for(const item of requestList) {
            if (item.currentResponsible == 'SeniorCustomerOfficer') {
                list.push(                
                <li className="list-group-item">
                    <Link className="link-secondary" to={{ pathname: '/initial', state: { record: item} }}>{item.recordNumber}</Link>
                </li>)
            }
        }
    }
    else if (currentUser && currentUser.role == 'AdministrationManager') {
        for(const item of requestList) {
            if (item.currentResponsible == 'FinancialManager') {
                list.push(                
                <li className="list-group-item">
                    <Link className="link-secondary" to={{ pathname: '/initial', state: { record: item} }}>{item.recordNumber}</Link>
                </li>)
            }
        }
    }

    return (
        <div className='container'>
        <h4 class="mb-3">Request List</h4>
            <ul className="list-group">
                {list}
            </ul>
        </div>
        )
}

export default RequestList;