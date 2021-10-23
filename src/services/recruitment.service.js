import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4001/";

const storeRecruitmentRequest = (duration, department, years, title, description) => {
    const data = {duration, department, years, title, description};
    return axios.post(API_URL + 'addRecruitmentRequest', data, {headers: authHeader()}
    ).then((response) => {
        return response.data;
    })
}

const getRecruitmentList = () => {
    return axios.get(API_URL + 'recruitmentList', {headers: authHeader()})
        .then((response) => {
            return response.data})
}

export default {
    storeRecruitmentRequest,
    getRecruitmentList,
};