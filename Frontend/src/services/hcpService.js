import api from "./api";

/**
 * Get all HCPs
 */
export const getHCPs = async () => {
    const response = await api.get("/hcps/");
    return response.data;
};

/**
 * Create HCP
 */
export const createHCP = async (hcp) => {
    const response = await api.post("/hcps/", hcp);
    return response.data;
};