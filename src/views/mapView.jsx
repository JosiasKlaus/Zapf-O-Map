import {Appbar, Banner, useTheme} from 'react-native-paper';
import {Image, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {calculateRegion, getLocation} from '../utils/geolocation';
import {mapStyleDark, mapStyleLight} from '../utils/mapstyle';
import {useEffect, useRef, useState} from 'react';

import { BaseAnimationBuilder } from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MapHeader from '../components/mapHeader';
import Slider from '@react-native-community/slider';
import StationMarker from '../components/stationMarker';
import StationSheet from '../components/stationSheet';
import {getStationList} from '../api/tankerkoenig';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useAsyncStorage from '../hooks/useAsyncStorage';

const DEFAULT_LATITUDE = 50.563527;
const DEFAULT_LONGITUDE = 8.500261;
const DEFAULT_RADIUS = 1000;

const DEFAULT_REGION = {
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015,
};

const MapViewComponent = ({stationId}) => {
  const [fuelType, setFuelType] = useAsyncStorage("fuelType", "e5");
  const [location, setLocation] = useState(DEFAULT_REGION);
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const [stations, setStations] = useState([]);
  const [station, setStation] = useState(null);

  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const mapRef = useRef(null);

  if (location == DEFAULT_REGION) {
    getLocation(setLocation);
  }

  useEffect(() => {
    getStationList(location.latitude, location.longitude, radius/1000).then(
      data => {
        setStations(data);
      },
      error => {
        console.log(error);
      },
    );
  }, [location, radius]);

  return (
    <View style={styles.container}>
      <MapHeader title={"Kartenansicht"} radius={radius} setRadius={setRadius}/>
      <GestureHandlerRootView style={{flex: 1}}>
        <MapView
          ref={mapRef}
          style={styles.mapView}
          customMapStyle={theme.dark ? mapStyleDark : mapStyleLight}
          showsUserLocation={true}
          toolbarEnabled={false}
          moveOnMarkerPress={false}
          showsMyLocationButton={false}
          mapPadding={{top: 10, bottom: station ? 520 : 10, left: 10, right: 10}}
          region={calculateRegion(location?.latitude, location?.longitude, radius)}
          onPress={() => setStation(null)}>
          {stations.map((station, index) => (
            <Marker
              key={index}
              tracksViewChanges={false}
              coordinate={{longitude: station.lng, latitude: station.lat}}
              onPress={() => {
                setStation(station);
                setTimeout(() => {
                  mapRef.current.animateToRegion(calculateRegion(station.lat, station.lng, radius), 100)
                }, 100);
              }}>
              <StationMarker title={station.brand} price={station[fuelType]} />
            </Marker>
          ))}
        </MapView>
        <StationSheet initStation={station} initSetStation={setStation} />
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapViewComponent;
