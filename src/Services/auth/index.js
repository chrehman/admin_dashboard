import axios from "axios";

const Endpoint = "http://localhost:3000/";

export const userEnable=(id)=>{
    return axios.post(Endpoint+"userEnable",{id})
}

export const userDisable=(id)=>{
    return axios.post(Endpoint+"userDisable",{id})
}

export const userDelete=(id)=>{
    return axios.post(Endpoint+"userDelete",{id})
}

export const getUsers=()=>{
    return axios.get(Endpoint+"list")
}