import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from "react-native";

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

const getLocation = async (callback) => {
  if (!requestLocationPermission()) return null;
  Geolocation.getCurrentPosition(
    position => { return callback(position.coords); },
    error => { return callback(false); },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    },
  );
};

export default getLocation;
