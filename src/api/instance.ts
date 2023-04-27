import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('bearerToken')}`,
    },
  });
};
