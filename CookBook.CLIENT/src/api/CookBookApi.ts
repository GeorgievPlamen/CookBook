import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ` + sessionStorage.getItem('jwt');
    return config
})

const authentication = {
    login: (email: string, password: string) => 
        axios.post('/authentication/login',{email,password}).then(x => x.data),

    register: (name: string , email: string, password: string) => 
        axios.post('/authentication/register',{name,email,password}).then(x => x.data)
}

export const api = {
    authentication
}