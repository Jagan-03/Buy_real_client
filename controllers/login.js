import axios from "axios";

const SERVER_URL =  "https://buyreal.herokuapp.com/login";

export const loginUser = async (user) => {
    const response = await axios.post(SERVER_URL, user);
    return response;
}

