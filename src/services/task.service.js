import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4001/";

const storeTask = (recordNumber, description, assignee, priority, department) => {
    const data = {recordNumber, description, assignee, priority, department};
    return axios.post(API_URL + 'storeTask', data, {headers: authHeader()})
        .then((response) => {
            return response.data
        })
}

const getTaskList = () => {
    return axios.get(API_URL + 'taskList', {headers: authHeader()})
        .then((response) => {
            return response.data})
}

const addNote = (id, note) => {
    const data = {id, note}
    return axios.post(API_URL + 'addNoteTask', data, {headers: authHeader()})
        .then((response) => {
            return response.data})
}

export default {
    storeTask,
    getTaskList,
    addNote,
};