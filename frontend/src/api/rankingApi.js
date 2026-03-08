import apiClient from "./apiClient";

const API = "http://localhost:3000/api/ranking";

export const getUnpluggedRanking = (itinerary) =>
    apiClient.get(`${API}/unplugged/${itinerary}`);

export const getPluggedInRanking = (itinerary) =>
    apiClient.get(`${API}/plugged-in/${itinerary}`);

export const getOlympiads = () =>
    apiClient.get(`${API}/olympiads`);

export const getItineraries = (olympiad) =>
    apiClient.get(`${API}/itineraries/${olympiad}`);

export const checkExercises = (itinerary) =>
    apiClient.get(`${API}/types/${itinerary}`);

export const retrieveDataFromCms = (itinerary) =>
    apiClient.get(`${API}/retrieve-plugged-in/${itinerary}`);
