import axios from "axios";

export function configAxios(){
    axios.defaults.baseURL="http://localhost:5000"

    axios.interceptors.request.use(
        (config)=>{
            const token= localStorage.getItem('token')
            config.headers.Authorization= token ? `Bearer ${token}`: null
            return config
        },
        (err)=>{
            Promise.reject(err)
        }
    )
}