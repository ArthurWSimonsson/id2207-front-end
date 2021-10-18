import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4001/";

const storeInitialRequest = (recordNumber, clientName, eventType, attendees, budget, decorations, parties,
    photos, food, drinks, role) => {
    const data = {recordNumber, clientName, eventType, attendees, budget, decorations, parties,
        photos, food, drinks, role};
    return axios.post(API_URL + 'initialRequest', data, {headers: authHeader()}
    ).then((response) => {
        return response.data;
    })
}

const getInitialRequestList = () => {
    return axios.get(API_URL + 'initialRequestList', {headers: authHeader()})
        .then((response) => {
            return response.data})
}

const updateInitialRequest = (id, recordNumber, clientName, eventType, attendees, budget, decorations, parties,
    photos, food, drinks, role) => {
    const data = {id, recordNumber, clientName, eventType, attendees, budget, decorations, parties,
        photos, food, drinks, role};
    return axios.post(API_URL + 'updateInitialRequest', data, {headers: authHeader()}
    ).then((response) => {
        return response.data;
    })
}


export default {
    storeInitialRequest,
    getInitialRequestList,
    updateInitialRequest,
};