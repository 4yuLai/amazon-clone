import axios from "axios";

const instance = axios.create({
    baseURL: 'https://us-central1-clone-7756a.cloudfunctions.net/api' // THE API (cloud function) URL
});

export default instance;

// http://localhost:5001/clone-7756a/us-central1/api