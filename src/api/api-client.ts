import axios from 'axios';

const apiEndpoint = process.env.NEXT_PUBLIC_BASE_API;
export const baseUrl = apiEndpoint;

export const apiClient = () =>
  axios.create({
    // baseURL: apiEndpoint,
    headers: {
      'Content-Type': 'application/json',
    },
  });
