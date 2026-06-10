import axios from "axios";

const instance = axios.create({
    baseURL: "https://hotel-management-be-75w4.onrender.com",
    withCredentials: true,
})

export default instance