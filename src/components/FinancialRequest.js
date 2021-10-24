import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";

import './FinancialRequest.css'

import RequestService from "../services/request.service";
import FinancialService from "../services/financial.service";


const FinancialRequest = (props) => {
    const [department, setDepartment] = useState("administration");
    const [reference, setReference] = useState("");
    const [amount, setAmount] = useState("");
    const [reason, setReason] = useState("");
    const [list, setList] = useState([]);

    useEffect (async () => {
        const list = await RequestService.getInitialRequestList();
        setList(list);
        setReference(list[0].recordNumber);
    }, []);

    const departmentChange = (e) => {
        const department = e.target.value;
        setDepartment(department);
    }

    const referenceChange = (e) => {
        const ref = e.target.value;
        setReference(ref);
    }

    const amountChange = (e) => {
        const amount = e.target.value;
        setAmount(amount);
    }

    const reasonChange = (e) => {
        const reason = e.target.value;
        setReason(reason);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        FinancialService.storefinancialRequest(reference, department, amount, reason).then(
            () => {
            props.history.push("/financialRequest");
            window.location.reload();
            },
            (error) => {
                console.log('financial error', error)
            }
        );
    }

    return (
        <div className='container'>
            <h4 className = 'mb-3'>Financial Request: </h4>
            <Form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label for='requestSelect' className='col-sm-2 col-form-label'>Record number: </label>
                    <div className='col-sm-10 '>
                        <select className='form-select input-medium' id='requestSelect' onChange={referenceChange}>
                            {list.map((item) => 
                                    <option value={item.recordNumber}>{item.recordNumber}</option>
                                )}
                        </select>
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
                    <label for="amount" className="col-sm-4 form-label">Required amount:</label>
                    <div className="col-sm-4">
                        <input className="form-control-md" 
                               id="amount" 
                               autoComplete="off" 
                               value={amount}
                               onChange={amountChange}/>
                    </div>
                </div>
                <div className="input-group">
                    <label for="reason" className="col-sm-4 form-label">Reason:</label>
                    <textarea id='reason' 
                              className="form-control-md"
                              value={reason}
                              onChange={reasonChange}>
                    </textarea>
                </div>
                <button class="btn btn-primary" type="submit">Submit</button>
            </Form>
        </div>
    )
}

export default FinancialRequest;