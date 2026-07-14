import api from "./api";

export const generateAISummary = async (message) => {

    const response = await api.post("/chat", {
        message
    });

    return response.data;
};