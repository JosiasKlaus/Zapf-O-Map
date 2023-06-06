import axios from 'axios';

const BASE_URL = 'https://creativecommons.tankerkoenig.de/json';
const API_KEY = 'e56b36eb-caaf-3488-c447-1f4d21f18e28';

const getStationList = async (latitude, longitude, radius = 5, sort = 'dist', type = 'all') => {
  const response = await axios.get(`${BASE_URL}/list.php?lat=${latitude}&lng=${longitude}&rad=${radius}&sort=${sort}&type=${type}&apikey=${API_KEY}`);
  return response.data.stations;
}

export default getStationList;
