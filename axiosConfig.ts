// First we need to import axios.js
import axios from "axios"

// Next we make an 'instance' of it
const instance = axios.create({
  headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
})

// instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;

export default instance;
