import axios from "axios";

const API = "http://localhost:3000/api/itineraries";

export const getAllItineraries = () => axios.get(API);
export const getItinerary = (id) => axios.get(`${API}/${id}`);
export const createItinerary = (data) => axios.post(API, data);
export const updateItinerary = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteItinerary = (id) => axios.delete(`${API}/${id}`);
