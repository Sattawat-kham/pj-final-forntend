import Axios from 'axios';
import config from '../config/index';

/* เข้าสู่ระบบ */
export const LoginService = async (data) => {
    return await Axios({
        method: "post",
        url: `http://139.59.232.220:9000/users/login`,
        config: { headers: { "Content-Type": "multipart/form-data" } },
        data: data
    })
};

/* สมัครสมาชิก */
export const RegisterService = async (data) => {
    return await Axios({
        method: "post",
        url: `${config.API_URL}/public/api/registers`,
        config: { headers: { "Content-Type": "multipart/form-data" } },
        data: data
    })
};

/* เรียกข้อมูลรายละเอียด */
export const GetQuizsDetail = async () => {
    return await Axios({
        method: "get",
        url: `${config.API_URL}/masters/getQuizsDetail`,
        headers: { Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("token")).access_token },
        config: { headers: { "Content-Type": "multipart/form-data" } },
    })
};

/* เรียกข้อมูลคำถาม  */
export const GetQuizs = async () => {
    return await Axios({
        method: "get",
        url: `${config.API_URL}/quizs/getQuizs`,
        headers: { Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("token")).access_token },
        config: { headers: { "Content-Type": "multipart/form-data" } },
    })
};

/* ส่งแบบประเมิน */
export const AddQuizs = async (data) => {
    return await Axios({
        method: "post",
        url: `${config.API_URL}/quizs/addQuizs`,
        headers: { Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("token")).access_token },
        config: { headers: { "Content-Type": "multipart/form-data" } },
        data: data
    })
};

/* ข้อมูลผู้สมัคร */
export const Getregister = async (data) => {
    return await Axios({
        method: "get",
        url: `${config.API_URL}/public/api/show_register`,
        headers: { Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("token")).access_token },
        config: { headers: { "Content-Type": "multipart/form-data" } },
        data: data
    })
};