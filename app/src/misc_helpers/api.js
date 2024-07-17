import axios from 'axios';  

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';  


  
/**  
 * Fetch the list of sentiment analyzers from the API  
 * @returns {Promise<Array>} - list of sentiment analyzers  
 */  
export const getSentimentAnalyzers = async () => {  
    try {  
        const response = await axios.get(`${API_URL}/models/`);  
        return response.data;  
    } catch (error) {  
        console.error('Error fetching sentiment analyzers:', error);  
        throw error;  
    }  
};  

/**  
 * Initiate sentiment analysis for a given query and model  
 * @param {string} query - the text to analyze  
 * @param {string} modelId - the ID of the selected model  
 * @returns {Promise<Object>} - response data from the API  
 */  
export const initiateSentimentAnalysis = async (query, modelId) => {  
    try {  
        const response = await axios.post(`${API_URL}/classifications/`, { query, model: modelId });  
        // console.log("Initiate analysis response: ", response)
        return response.data;  
    } catch (error) {  
        console.error('Error initiating sentiment analysis:', error);  
        throw error;  
    }  
};  


/**  
 * Fetch the classification status from the API  
 * @param {string} cid - classification ID  
 * @param {string} accessKey - access key for the classification  
 * @returns {Promise<Object>} - classification status data  
 */ 
export const getClassificationStatus = async (cid, accessKey) => {  
    try {  
        const response = await axios.get(`${API_URL}/classifications/`, {  
            params: { cid, access_key: accessKey },  
        });  
        return response.data;  
    } catch (error) {  
        console.error('Error fetching classification status:', error);  
        throw error;  
    }  
};  


/**  
 * Add a new sentiment analysis model to the API  
 * @param {Object} model - model data  
 * @returns {Promise<Object>} - response data from the API  
 */  
export const addNewModel = async (model) => {  
    try {  
        const response = await axios.post(`${API_URL}/models/`, model);  
        return response.data;  
    } catch (error) {  
        console.error('Error adding new model:', error);  
        throw error;  
    }  
};  

