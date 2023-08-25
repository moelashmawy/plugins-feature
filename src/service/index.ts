import axios from 'axios';

const API_URL = 'https://my-json-server.typicode.com/moelashmawy/plugins-data';

const fetchData = async (path: string) => {
  try {
    const response = await axios.get(`${API_URL}/${path}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const putData = async (path: string, data: unknown) => {
  try {
    const response = await axios.put(`${API_URL}/${path}`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export { fetchData, putData };
