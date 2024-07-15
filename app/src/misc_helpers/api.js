import axios from 'axios';  

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';  

export const getSentimentAnalyzers = async () => {  
    try {  
        const response = await axios.get(`${API_URL}/`);  
        return response.data;  
    } catch (error) {  
        console.error('Error fetching sentiment analyzers:', error);  
        throw error;  
    }  
};  

export const initiateSentimentAnalysis = async (query, modelId) => {  
    try {  
        const response = await axios.post(`${API_URL}/`, { query, model: modelId });  
        // console.log("Initiate analysis response: ", response)
        return response.data;  
    } catch (error) {  
        console.error('Error initiating sentiment analysis:', error);  
        throw error;  
    }  
};  

export const getClassificationStatus = async (cid, accessKey) => {  
    try {  
        const response = await axios.get(`${API_URL}/get_status/`, {  
            params: { cid, access_key: accessKey },  
        });  
        return response.data;  
    } catch (error) {  
        console.error('Error fetching classification status:', error);  
        throw error;  
    }  
};  
