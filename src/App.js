import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import InitialRequest from "./components/InitialRequest";
import RequestList from "./components/RequestList";
import Task from "./components/Task";
import TaskList from "./components/TaskList";
import TaskView from "./components/TaskView";
import RecruitmentRequest from "./components/RecruitmentRequest";
import RecruitmentList from "./components/RecruitmentList";
import RecruitmentView from "./components/RecruitmentView";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showTaskList, setShowTaskList] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showInitial, setShowInitial] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showList, setShowList] = useState(false)
  const [showHR, setShowHR] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.role.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.role.includes("ROLE_ADMIN"));
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

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
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
          {showHR && (
            <li className="nav-item">
              <Link to={"/recruitmentList"} className="nav-link">
                Recruitment List
              </Link>
            </li>
          )}
        </div>
        {showList && (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/list"} className="nav-link">
                List
              </Link>
            </li>
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

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
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
          <Route exact path="/task" component={Task} />
          <Route exact path="/taskList" component={TaskList} />
          <Route exact path="/viewTask" component={TaskView} />
          <Route exact path="/recruitmentRequest" component={RecruitmentRequest} />
          <Route exact path="/recruitmentList" component={RecruitmentList} />
          <Route exact path="/recruitmentView" component={RecruitmentView} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
