import axiosInstance from '../axiosInstance';

const BASE_URL = '/api/campaign';

const CampaignService={
    getCampaign: async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/get-company-campaigns`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteCampaign: async (userId) => {
        try {
            const response = await axiosInstance.delete(`${BASE_URL}/delete-campaign/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    createCampaign: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/create-campaign`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateCampaign: async (userId, payload) => {
        try {
            const response = await axiosInstance.patch(`${BASE_URL}/update-campaign/${userId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateCampaignStatus: async (userId, payload) => {
        try {
            const response = await axiosInstance.patch(`${BASE_URL}/update-campaign-status/${userId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default CampaignService;