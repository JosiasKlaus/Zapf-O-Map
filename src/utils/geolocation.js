import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

let regionCache = {};

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    return false;
  }
};

export const getLocation = async callback => {
  if (!requestLocationPermission()) return null;
  Geolocation.getCurrentPosition(
    position => {
      callback(position.coords);
    },
    error => {
      callback(null);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};

export const calculateRegion = (lat, lon, radius) => {
  if (regionCache[`${lat};${lon};${radius}`]) {
    return regionCache[`${lat};${lon};${radius}`];
  }

  const angularDistance = radius / 40075;
  const latDelta = radius / (111.32 * 1000);
  const lonDelta = Math.abs(
    Math.atan2(
      Math.sin(angularDistance) * Math.cos(lat),
      Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat),
    ),
  );

  const region = {
    latitude: lat,
    longitude: lon,
    latitudeDelta: latDelta,
    longitudeDelta: lonDelta,
  };

  regionCache[`${lat};${lon};${radius}`] = region;
  return region;
};
