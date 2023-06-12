import {StyleSheet} from 'react-native';
import {useState, useEffect, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'react-native-paper';

import {getLocation, calculateRegion} from '../utils/geolocation';
import {getStationList} from '../api/tankerkoenig';
import StationMarker from '../components/stationMarker';
import StationSheet from '../components/stationSheet';
import {mapStyleDark, mapStyleLight} from '../utils/mapstyle';

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
  const [station, setStation] = useState(null);

  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const mapRef = useRef(null);

  if (location == DEFAULT_REGION) {
    getLocation(setLocation);
  }

  // Get station list on location or radius change
  useEffect(() => {
    getStationList(location.latitude, location.longitude, radius).then(
      data => {
        setStations(data);
      },
      error => {
        console.log(error);
      },
    );
  }, [location, radius]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.mapView}
        customMapStyle={theme.dark ? mapStyleDark : mapStyleLight}
        showsUserLocation={true}
        zoomEnabled={false}
        toolbarEnabled={false}
        moveOnMarkerPress={false}
        mapPadding={{top: insets.top, bottom: 20}}
        region={calculateRegion(location?.latitude, location?.longitude, radius)}
        onPress={() => setStation(null)}>
        {stations.map((station, index) => (
          <Marker
            key={index}
            tracksViewChanges={false}
            coordinate={{longitude: station.lng, latitude: station.lat}}
            onPress={() => {
              setStation(station);
              mapRef.current.animateToRegion(calculateRegion(station.lat - 0.0085, station.lng, radius), 100)
            }}>
            <StationMarker title={station.brand} price={station.e5} />
          </Marker>
        ))}
      </MapView>
      <StationSheet initStation={station} />
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
