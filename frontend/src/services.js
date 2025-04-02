import axios from 'axios';

export const addData = async (data) => {
    try {
        const response = await axios.post('http://localhost:8000/mortgages', data)
        return response.data;        
    } catch (error) {
        console.log("Error adding data", error);
    }
}

export const getData = async () => {
    try {
        const response = await axios.get('http://localhost:8000/mortgages');
        return response.data;        
    } catch (error) {
        console.log("Error getting data", error);       
    }
}

export const getDataById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8000/mortgages/${id}`)
        return response.data;        
    } catch (error) {
        console.log("Error getting data by id", error);
    }
}

export const updateData = async (id, data) => {
    try {
        const response = await axios.put(`http://localhost:8000/mortgages/${id}`, data)
        return response.data;        
    } catch (error) {
        console.log("Error updating data", error);
    }
}

export const deleteData = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8000/mortgages/${id}`)
        return response.data;        
    } catch (error) {
        console.log("Error deleting data", error);
    }
}