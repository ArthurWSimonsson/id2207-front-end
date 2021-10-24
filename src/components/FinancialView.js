import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";

import FinancialService from "../services/financial.service";
import AuthService from "../services/auth.service";

const FinancialView = (props) => {
    const [reference, setReference] = useState("");
    const [department, setDepartment] = useState("");
    const [amount, setAmount] = useState("");
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState("");
    const [user, setUser] = useState(undefined);

    useEffect (async() => {
        setUser(AuthService.getCurrentUser);
        setReference(props.location.state.financial.reference);
        setDepartment(props.location.state.financial.department);
        setAmount(props.location.state.financial.amount);
        setReason(props.location.state.financial.reason);
        setStatus(props.location.state.financial.status);
    },[]);

    const statusChange = (e) => {
        const status = e.target.value;
        setStatus(status);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        FinancialService.changeFinancialStatus(props.location.state.financial._id, status).then(
            () => {
            props.history.push("/financialList");
            window.location.reload();
            },
            (error) => {
                console.log('recruitment error', error);
            }
        );
    }

    let content;

    if (user && user.role === 'FinancialManager') {
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
        content = 
        <ul className ='list-group'>
            <li className ='list-group-item'>{status}</li>
        </ul>                 
}

    return(
        <div className='container'>
            <ul className='list-group'>
                <li className='list-group-item'>
                    Reference: {reference}
                </li>
                <li className='list-group-item'>
                    Department: {department}
                </li>
                <li className='list-group-item'>
                    Amount: {amount}
                </li>
                <li className='list-group-item'>
                    Reason: {reason}
                </li>
            </ul>
            {content}
        </div>
    )
}

export default FinancialView;