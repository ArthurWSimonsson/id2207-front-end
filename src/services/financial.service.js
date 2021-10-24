import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4001/";

const storefinancialRequest = (reference, department, amount, reason) => {
    const data = {reference, department, amount, reason};
    return axios.post(API_URL + 'addFinancialRequest', data, {headers: authHeader()}
    ).then((response) => {
        return response.data;
    })
}

const getFinancialList = () => {
    return axios.get(API_URL + 'financialList', {headers: authHeader()})
        .then((response) => {
            return response.data
        })
}

const changeFinancialStatus = (id, status) => {
    const data = {id, status}
    return axios.post(API_URL + 'changeFinancialStatus', data, {headers: authHeader()})
        .then((response) => {
            return response.data})
}


export default {
    storefinancialRequest,
    getFinancialList,
    changeFinancialStatus,
}