import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";

import FinancialService from "../services/financial.service";

const FinancialList = (props) => {
    const [financialList, setFinancialList] = useState([]);

    useEffect(async() => {
        const list = await FinancialService.getFinancialList();
        setFinancialList(list);
    },[]);

    return(
        <div>
            <ul className="list-group">
            {financialList.map((item) => {
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
                                to={{pathname :'/financialView', state :{financial: item}}}>
                                    {item.department}
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

export default FinancialList;