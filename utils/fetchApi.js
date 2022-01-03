import axios from "axios";

export const BASE_URL = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': 'a5ac5b635emsh5a809e41d01b9acp16c894jsnf7572de3e949'
          }
    });

    return data;
}