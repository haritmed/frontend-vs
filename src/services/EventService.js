import axios from 'axios';

// Define the base URL for event-related API requests
const EVENT_API_BASE_URL = 'http://localhost:8080/api/events';

// Fetch events for a specific date
export const getEventsByDate = (date) => {
    return axios.get(`${EVENT_API_BASE_URL}/${date}`);
};

// Add a new event
export const createEvent = (eventData) => {
    return axios.post(EVENT_API_BASE_URL, eventData);
};

// Optionally, you can add more functions like update or delete an event later if needed
