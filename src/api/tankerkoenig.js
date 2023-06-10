import axios from 'axios';

const BASE_URL = 'https://creativecommons.tankerkoenig.de/json';
const API_KEY = 'e56b36eb-caaf-3488-c447-1f4d21f18e28';

const CACHE_TIMEOUT = 1000 * 60 * 5; // 5 minutes
let localCache = {};

export const getStationList = async (latitude, longitude, radius = 5, sort = 'dist', type = 'all', use_cache = true) => {
  const url = `${BASE_URL}/list.php?lat=${latitude}&lng=${longitude}&rad=${radius}&sort=${sort}&type=${type}&apikey=${API_KEY}`;
  if (use_cache && localCache[url]) {
    return localCache[url];
  }
  const response = await axios.get(url);
  localCache[url] = response.data.stations;
  setTimeout(() => { delete localCache[url]; }, CACHE_TIMEOUT);
  return response.data.stations;
}

export const getStationDetails = async (stationId, use_cache = true) => {
  const url = `${BASE_URL}/detail.php?id=${stationId}&apikey=${API_KEY}`;
  if (use_cache && localCache[url]) {
    return localCache[url];
  }
  const response = await axios.get(url);
  localCache[url] = response.data.station;
  setTimeout(() => { delete localCache[url]; }, CACHE_TIMEOUT);
  return response.data.station;
}
