import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import InitialRequest from "./components/InitialRequest";
import RequestList from "./components/RequestList";
import Task from "./components/Task";
import TaskList from "./components/TaskList";
import TaskView from "./components/TaskView";
import RecruitmentRequest from "./components/RecruitmentRequest";
import RecruitmentList from "./components/RecruitmentList";
import RecruitmentView from "./components/RecruitmentView";
import FinancialRequest from "./components/FinancialRequest";
import FinancialList from "./components/FinancialList";
import FinancialView from "./components/FinancialView";
import ApprovedRequests from "./components/ApprovedRequests";

const App = () => {
  const [showTask, setShowTask] = useState(false);
  const [showTaskList, setShowTaskList] = useState(false);
  const [showInitial, setShowInitial] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showList, setShowList] = useState(false)
  const [showHR, setShowHR] = useState(false);
  const [showFM, setShowFM] = useState(false)

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowInitial(user.role === "CustomerOfficer")
      setShowTask(user.role === 'ServiceManager' || 
                  user.role === 'ProductionManager')
      setShowTaskList(user.role === 'ServiceManager' || 
                      user.role === 'ProductionManager' ||
                      user.role === 'Chef' ||
                      user.role === 'Decorations')
      setShowList(user.role === 'FinancialManager'     || 
                  user.role === 'AdministrationManager' || 
                  user.role === 'SeniorCustomerOfficer')
      setShowHR(user.role === 'HR');
      setShowFM(user.role === 'FinancialManager');
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          SEP
        </Link>
        <div className="navbar-nav mr-auto">
          {showInitial && (
          <li className="nav-item">
            <Link to={"/initial"} className="nav-link">
              Request
            </Link>
          </li>
          )}

          {showTask && (
            <li className="nav-item">
              <Link to={"/task"} className="nav-link">
                New Task
              </Link>
            </li>
          )}
          {showTaskList && (
            <li className="nav-item">
              <Link to={"/taskList"} className="nav-link">
                Task List
              </Link>
            </li>
          )}

          {showTask && (
            <li className="nav-item">
              <Link to={"/recruitmentRequest"} className="nav-link">
                Recruitment Request
              </Link>
            </li>
          )}
          {showTask && (
            <li className="nav-item">
              <Link to={"/financialRequest"} className="nav-link">
                Financial Request
              </Link>
            </li>
          )}
          {(showTask || showHR) && (
            <li className="nav-item">
              <Link to={"/recruitmentList"} className="nav-link">
                Recruitment List
              </Link>
            </li>
          )}
          {(showTask ||showFM) && (
            <li className="nav-item">
              <Link to={"/financialList"} className="nav-link">
                Financial Request List
              </Link>
            </li>
          )}
        </div>
        {showList && (
          <div className='navbar-nav ml-auto'>
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/list"} className="nav-link">
                  Request List
                </Link>
              </li>
            </div>
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/approvedRequests"} className="nav-link">
                  Approved Requests
                </Link>
              </li>
            </div>
          </div>
          
        )}
        {(currentUser)? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        )}
        {currentUser && (
        <div>
          <span className="badge badge-info">Signed is as: {currentUser.role}</span>
        </div>
        )}

      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/initial" component={InitialRequest} />
          <Route exact path="/list" component={RequestList} />
          <Route exact path="/approvedRequests" component={ApprovedRequests} />
          <Route exact path="/task" component={Task} />
          <Route exact path="/taskList" component={TaskList} />
          <Route exact path="/viewTask" component={TaskView} />
          <Route exact path="/recruitmentRequest" component={RecruitmentRequest} />
          <Route exact path="/recruitmentList" component={RecruitmentList} />
          <Route exact path="/recruitmentView" component={RecruitmentView} />
          <Route exact path="/financialRequest" component={FinancialRequest} />
          <Route exact path="/financialList" component={FinancialList} />
          <Route exact path="/financialView" component={FinancialView} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
