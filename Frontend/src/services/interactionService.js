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

        console.error("Load Interaction Error:", error);

        throw error;
    }
};