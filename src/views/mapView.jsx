import {StyleSheet, PermissionsAndroid, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {useState} from 'react';
import Slider from '@react-native-community/slider';
import axios from 'axios';
import { Button } from 'react-native-paper';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

function MapScreen() {
  const [location, setLocation] = useState(false);
  const [stations, setStations] = useState([]);
  const [radius, setRadius] = useState(0.015);

  const getStationData = async (latitude, longitude) => {
    const response = axios.get(
      `https://creativecommons.tankerkoenig.de/json/list.php?lat=${latitude}&lng=${longitude}&rad=5&sort=dist&type=all&apikey=00000000-0000-0000-0000-000000000002`,
    );
    response.then(res => {
      setStations(res.data.stations);
    });
  };

  if (!location) {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position);
            getStationData(position.coords.latitude, position.coords.longitude);
          },
          error => {
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  }

  return (
    <View style={styles.container}>
      <Slider
        style={{width: 400, height: 80}}
        step={0.005}
        minimumValue={0.015}
        maximumValue={0.1}
        value={radius}
        onValueChange={setRadius}
      />
      <Button onPress={() => getStationData(location.coords.latitude, location.coords.longitude)}>Update</Button>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsTraffic={true}
        zoomEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        showsPointsOfInterest={false}
        customMapStyle={[
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
        ]}
        region={{
          latitude: location ? location.coords.latitude : 51.1642292,
          longitude: location ? location.coords.longitude : 10.4541194,
          latitudeDelta: radius,
          longitudeDelta: radius,
        }}>
        {stations.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              longitude: marker.lng,
              latitude: marker.lat,
            }}
            title={marker.brand}
            description="Super E5: 1,799€"
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    top: 100,
  },
});

export default MapScreen;
