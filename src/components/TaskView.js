import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import TaskService from "../services/task.service";

const TaskView = (props) => {
    const [recordNumber, setRecordNumber] = useState("");
    const [assignee, setAssignee] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [note, setNote] = useState("");
    const [id, setId] = useState("");
    const [notes, setNotes] = useState([]);
    const [task, setTask] = useState(undefined);

    useEffect (async() => {
        setNotes(props.location.state.task.notes);
        setRecordNumber(props.location.state.task.recordNumber);
        setPriority(props.location.state.task.priority);
        setAssignee(props.location.state.task.assignee);
        setDescription(props.location.state.task.description);
        setId(props.location.state.task._id);
        setTask(props.location.state.task);
    },[]);

    const handleSubmitNote = (e) => {
        e.preventDefault();
        setNote("");
        TaskService.addNote(id, note).then(
            () => {
            task.notes.push(note)
            props.history.push({
                pathname: '/viewTask',
                state: { task: task}
              });
            window.location.reload();
            },
            (error) => {
                console.log('task error', error)
            })
    }

    const onChangeNote = (e) => {
        const note = e.target.value;
        setNote(note);
    }

    return (
        <div className='container'>
            <h4 className="mb-3">Task View</h4>
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        Record Number: {recordNumber}
                    </li>
                    <li className="list-group-item">
                        Assignee: {assignee}
                    </li>
                    <li className="list-group-item">
                        Description: {description}
                    </li>
                    <li className="list-group-item">
                        Priority: {priority}
                    </li>
                    {notes.map(item => {
                        return <li className="list-group-item">Note: {item}</li>
                    })}
                </ul>
            </div>
            <Form onSubmit={handleSubmitNote}>
                <div className="input-group">
                    <textarea id='textAreaTask' className="form-control" placeholder='Note' value={note} onChange={onChangeNote}></textarea>
                    <button class="btn btn-outline-secondary" type="submit">Add Note</button>
                </div>
            </Form>
        </div>
    )
}

export default TaskView;