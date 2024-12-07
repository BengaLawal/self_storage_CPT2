import axios from 'axios';

async function checkAdminStatus(userId) {
    try {
        const response = await axios.post('/check-admin', { userId });
        return response.data.isAdmin; // Boolean indicating admin status
    } catch (error) {
        console.error('Error checking admin status:', error.response?.data || error.message);
        return false; // Default to non-admin on error
    }
}

export default checkAdminStatus;
