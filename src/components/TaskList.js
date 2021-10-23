import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";

import TaskService from '../services/task.service'
import AuthService from "../services/auth.service";

const TaskList = (props) => {
    const [taskList, setTaskList] = useState([]);
    const [currentUser, setCurrentUser] = useState("");

    useEffect (async () => {
        const list = await TaskService.getTaskList();
        const user = AuthService.getCurrentUser();
        setCurrentUser(user);
        setTaskList(list);
    },[]);

    const list = [];

    for(const item of taskList) {
        if (item.department === 'Service' && 
           (currentUser.role === 'Chef' || 
            currentUser.role === 'ServiceManager')) {
            list.push(
                <li className="list-group-item">
                    <Link className="link-secondary text-decoration-none" 
                          to={{pathname :'/viewTask', state :{task: item}}}>
                        Record Number:{item.recordNumber} Assignee:{item.assignee}
                    </Link>
                </li>
            )
        }
        else if (item.department === 'Production' && 
                (currentUser.role === 'Decorations' ||
                 currentUser.role === 'ProductionManager')) {
            list.push(
                <li className="list-group-item">
                    <Link className="link-secondary text-decoration-none" 
                          to={{pathname :'/viewTask', state :{task: item}}}>
                        Record Number: {item.recordNumber} Assignee: {item.assignee}
                    </Link>
                </li>
            )
        }
    }
    return(
        <div>
            {list}
        </div>
    )
}

export default TaskList;