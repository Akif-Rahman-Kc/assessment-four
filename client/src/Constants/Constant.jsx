import axios from "axios";

export const UserApi = axios.create({baseURL:'http://localhost:4000/'})