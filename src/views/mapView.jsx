import {StyleSheet, View} from 'react-native';
import {useState} from 'react';
import MapView, { Marker } from 'react-native-maps';

import getLocation from '../utils/geolocation';
import getStationList from '../api/tankerkoenig';
import { Button } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function MapScreen() {
  const [location, setLocation] = useState(false);
  const [radius, setRadius] = useState(1);
  const [stations, setStations] = useState([]);

  if (!location) {
    getLocation(setLocation);
  }

  const loadStationData = () => {
    if(location) {
      console.log("Requesting stations for location: " + location.latitude + ", " + location.longitude);
      getStationList(location.latitude, location.longitude, radius).then((data) => {
        setStations(data);
      });
    }
  }

  const callback = (region) => {
    if(location) {
      if(region.latitude == location.latitude && region.longitude == location.longitude) {
        return;
      }
      setLocation(region);
      loadStationData();
    }
  };


  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView
        style={styles.mapView}
        showsUserLocation={true}
        showsTraffic={true}
        zoomEnabled={false}
        region={{
          latitude: location ? location.latitude : 51.165707,
          longitude: location ? location.longitude : 10.452764,
          latitudeDelta: (radius * 2) / 111.321,
          longitudeDelta: 0
        }}
        onRegionChangeComplete={callback}
      >
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    flex: 1
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
    marginBottom: 50,
  }
});

export default MapScreen;
