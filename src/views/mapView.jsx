import {StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import MapView, { Circle, Marker } from 'react-native-maps';
import { TextInput } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import Slider from '@react-native-community/slider';

import getLocation from '../utils/geolocation';
import getStationList from '../api/tankerkoenig';
import mapStyle from '../utils/mapstyle';

function MapScreen() {
  const [location, setLocation] = useState(false);
  const [radius, setRadius] = useState(1);
  const [stations, setStations] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if(location) {
      getStationList(location.latitude, location.longitude, radius).then(
        (data) => {
          setStations(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }, [location, radius]);

  if (!location) {
    getLocation(setLocation);
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView
        style={styles.mapView}
        customMapStyle={mapStyle}
        showsUserLocation={true}
        zoomEnabled={false}
        mapPadding={{top: 0, right: 0, bottom: 25, left: 0}}
        region={{
          latitude: location ? location.latitude : 51.165707,
          longitude: location ? location.longitude : 10.452764,
          latitudeDelta: (radius * 2) / 111.321,
          longitudeDelta: 0
        }}
      >
        <Circle
          center={{
            longitude: location ? location.longitude : 10.452764,
            latitude: location ? location.latitude : 51.165707,
          }}
          radius={radius * 500}
          fillColor="rgba(255, 0, 0, 0.1)"
          strokeColor="rgba(255, 0, 0, 0.5)"
          strokeWidth={1}
        />
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
      <BottomSheet
        snapPoints={[25, 140]}
        initialSnapIndex={0}
        activeOffsetY={[-1, 1]} 
        failOffsetX={[-5, 5]}
      >
        <TextInput
          style={{ margin: 10 }}
          label="Adresse / Ort"
          mode='outlined'
          dense={true}
          value={text}
          onChangeText={text => setText(text)}
        />
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={1}
          maximumValue={10}
          step={0.25}
          onValueChange={(value) => setRadius(value)}
        />
      </BottomSheet>
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
  }
});

export default MapScreen;
