import axios from 'axios';

const instance = axios.create({
    baseURL: "https://form-table-sort.firebaseio.com/"
});

export default instance;