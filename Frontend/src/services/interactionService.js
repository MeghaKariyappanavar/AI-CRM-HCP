import api from "./api";

/**
 * Save Interaction
 */
export const saveInteraction = async (interaction) => {
    try {

        const response = await api.post(
            "/interactions/",
            interaction
        );

        return response.data;

    } catch (error) {

        console.error("Save Interaction Error:", error);

        throw error;
    }
};


/**
 * Get All Interactions
 */
export const getAllInteractions = async () => {
    try {

        const response = await api.get(
            "/interactions/"
        );

        return response.data;

    } catch (error) {

        console.error("Load Interactions Error:", error);

        throw error;
    }
};


/**
 * Get Interaction History
 */
export const getInteractionHistory = async () => {
    try {

        const response = await api.get(
            "/interactions/history"
        );

        return response.data;

    } catch (error) {

        console.error("Load Interaction History Error:", error);

        throw error;
    }
};

export const getInteraction = async (id) => {
    const response = await api.get(`/interactions/${id}`);
    return response.data;
};

export const updateInteraction = async (id, interaction) => {
    const response = await api.put(`/interactions/${id}`, interaction);
    return response.data;
};
