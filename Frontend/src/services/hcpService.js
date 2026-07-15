import api from "./api";

export const getHCPs = async () => {
    const response = await api.get("/hcps/");
    return response.data;
};

export const getHCP = async (id) => {
    const response = await api.get(`/hcps/${id}`);
    return response.data;
};

export const createHCP = async (hcp) => {
    const response = await api.post("/hcps/", hcp);
    return response.data;
};

export const updateHCP = async (id, hcp) => {
    const response = await api.put(`/hcps/${id}`, hcp);
    return response.data;
};

export const deleteHCP = async (id) => {
    const response = await api.delete(`/hcps/${id}`);
    return response.data;
};