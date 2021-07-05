import axios from 'axios'

// const baseURL = "http://localhost:5860/"         // local testing
const baseURL = "https://servesup.herokuapp.com/api"
const instance = axios.create({
  baseURL
});

export default instance