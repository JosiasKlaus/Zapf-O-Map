import {StyleSheet, View} from 'react-native';
import {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Button, DataTable, IconButton, Text, TextInput} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {getLocation, calculateRegion} from '../utils/geolocation';
import getStationList from '../api/tankerkoenig';
import mapStyle from '../utils/mapstyle';
import StationMarker from '../components/stationMarker';
import { demoStationList } from '../utils/stations';
import { Image } from 'react-native';

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
  const insets = useSafeAreaInsets();

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
        toolbarEnabled={false}
        mapPadding={{top: insets.top, right: 0, bottom: 25, left: 0}}
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
        style={styles.bottomSheet}
        snapPoints={[24, 530]}
        initialSnapIndex={0}
        activeOffsetY={[-1, 1]}
        failOffsetX={[-5, 5]}>
        {/* <TextInput
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
        /> */}
        <Image source={require('../assets/aral.jpg')} style={styles.image} />
        <View style={{flexDirection: 'row', margin: 10}}>
          <View>
            <Text style={styles.name}>ARAL Tankstelle</Text>
            <Text style={styles.address}>Bergstraße 4, 35578 Wetzlar</Text>
          </View>
          <View style={{marginTop: 10, marginLeft: 'auto'}}>
            <Text style={{ fontSize: 12, fontWeight: 'light', fontFamily: 'monospace', letterSpacing: -1 }}>Mo-Do: 05:00-23:00</Text>
            <Text style={{ fontSize: 12, fontWeight: 'light', fontFamily: 'monospace', letterSpacing: -1 }}>Fr-So: 03:00-00:00</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <IconButton
            icon="directions"
            color="#000"
            size={20}
            mode="contained"
          />
          <IconButton
            icon="phone"
            color="#000"
            size={20}
            mode="contained"
          />
          <IconButton
            icon="web"
            color="#000"
            size={20}
            mode="contained"
          />
        </View>
        <DataTable style={styles.table}>
          <DataTable.Row>
            <DataTable.Cell>Kraftstoff</DataTable.Cell>
            <DataTable.Cell numeric>Preis</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>E5</DataTable.Cell>
            <DataTable.Cell numeric>1,87 €</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>E10</DataTable.Cell>
            <DataTable.Cell numeric>1,82 €</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Diesel</DataTable.Cell>
            <DataTable.Cell numeric>1,79 €</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
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
  bottomSheet: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    maxHeight: 180,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 16,
  },
});

export default MapScreen;
