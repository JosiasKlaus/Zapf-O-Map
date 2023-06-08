import {StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {TextInput} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import Slider from '@react-native-community/slider';

import {getLocation, calculateRegion} from '../utils/geolocation';
import getStationList from '../api/tankerkoenig';
import mapStyle from '../utils/mapstyle';
import StationMarker from '../components/stationMarker';
import { demoStationList } from '../utils/stations';

const DEFAULT_LATITUDE = 50.563527;
const DEFAULT_LONGITUDE = 8.500261;
const DEFAULT_RADIUS = 1000;

const DEFAULT_REGION = {
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015,
};

function MapScreen() {
  const [location, setLocation] = useState(DEFAULT_REGION);
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const [stations, setStations] = useState([]);
  const [text, setText] = useState('');

  // Set map location to current location
  if(location == DEFAULT_REGION) {
    getLocation(setLocation);
  }

  // Get station list on location or radius change
  useEffect(() => {
    /* getStationList(location.latitude, location.longitude, radius).then(
      data => {
        setStations(data);
      },
      error => {
        console.log(error);
      },
    ); */
    setStations(demoStationList);
  }, [location, radius]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView
        style={styles.mapView}
        customMapStyle={mapStyle}
        showsUserLocation={true}
        zoomEnabled={false}
        mapPadding={{top: 0, right: 0, bottom: 25, left: 0}}
        region={calculateRegion(location.latitude, location.longitude, radius)}>
        {stations.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{longitude: marker.lng, latitude: marker.lat}}>
            <StationMarker title={marker.brand} price={marker.e5} />
          </Marker>
        ))}
      </MapView>
      <BottomSheet
        snapPoints={[25, 140]}
        initialSnapIndex={0}
        activeOffsetY={[-1, 1]}
        failOffsetX={[-5, 5]}>
        <TextInput
          style={{margin: 10}}
          label="Adresse / Ort"
          mode="outlined"
          dense={true}
          value={text}
          onChangeText={text => setText(text)}
        />
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={1000}
          maximumValue={10000}
          step={250}
          onValueChange={value => setRadius(value)}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    flex: 1,
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
