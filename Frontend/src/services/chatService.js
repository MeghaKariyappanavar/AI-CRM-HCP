import api from "./api";

export const generateAISummary = async (message) => {

    const response = await api.post("/chat", {
        message
    });

    return response.data;
};

export const saveAISummary = async (message) => {
    const response = await api.post("/chat/save", {
        message
    });

    return response.data;
};
