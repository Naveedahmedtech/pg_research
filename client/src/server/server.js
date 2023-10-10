import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const get = async (url) => {
  let res, err;
  try {
    const response = await api.get(url);
    res = response.data;
  } catch (error) {
    err = error;
  }
  return { res, err };
};


export const post = async (url, data) => { 
    let res, err;
    try {
      const response = await api.post(url, data);
      res = response.data;
    } catch (error) {
      err = error;
    }
    return { res, err };
}
