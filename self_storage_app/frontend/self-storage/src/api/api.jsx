import axios from "axios";

const createApiClient = (token = null) => {
    const apiClient = axios.create({
        baseURL: import.meta.env.DEV
            ? '/api'  // Use proxy during development
            : "https://asgt8dbww4.execute-api.eu-west-1.amazonaws.com/Prod"
    });

    // Add token to headers if provided
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return apiClient;
};

// Keep the existing admin status check function
export async function checkAdminStatus(userId, authToken) {
    try {
        const apiClient = createApiClient(authToken);
        const endpoint = `/users/${userId}/isAdmin`;
        console.log(`Making request to: ${apiClient.defaults.baseURL}${endpoint}`);

        const response = await apiClient.post(endpoint);
        return response.data.isAdmin; // Boolean indicating admin status
    } catch (error) {
        if (error.response) {
            console.error("API error:", error.response.status, error.response.data);
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Request setup error:", error.message);
        }
        return false; // Default to non-admin on error
    }
}

// Additional utility functions for API calls
export async function fetchStorageUnits(token) {
    try {
        const apiClient = createApiClient(token);
        const response = await apiClient.get('/storage-units');
        return response.data;
    } catch (error) {
        console.error("Error fetching storage units:", error);
        throw error;
    }
}

export default createApiClient;