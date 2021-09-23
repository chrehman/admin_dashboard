import axios from "axios";


const Endpoint = "http://localhost:3000/";


export const getCitizens = async () => {
    return await axios.get(Endpoint + "citizens")

}

export const getResponders = () => {
    return axios.get(Endpoint + "responders");
}


export const getApplyCitizens = async () => {
    return await axios.get(Endpoint + "applyCitizens")

}

export const getApplyResponders = () => {
    return axios.get(Endpoint + "applyResponders");
}


export const createCitizen=(id)=>{
    return axios.post(Endpoint+"createCitizen",{id})
}
export const deleteCitizenRequest=(id)=>{
    return axios.post(Endpoint+"deleteCitizenRequest",{id})
}

export const createResponder=(id)=>{
    return axios.post(Endpoint+"createResponder",{id})
}
export const deleteResponderRequest=(id)=>{
    return axios.post(Endpoint+"deleteResponderRequest",{id})
}