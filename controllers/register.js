import axios from "axios";

const SERVER_URL =  "https://buyreal.herokuapp.com/register";

export const registerUser = (user) => {
    const response = axios.post(SERVER_URL, user);
    return response;
}
