import { StyleSheet, View } from 'react-native';
import { Appbar, List, Text } from 'react-native-paper';

import { useState } from 'react';
import { ScrollView } from 'react-native';
import { getStationList } from '../api/tankerkoenig';
import useAsyncStorage from '../hooks/useAsyncStorage';
import MapHeader from '../components/mapHeader';

function ListViewComponent() {
  const [fuelType, setFuelType] = useAsyncStorage("fuelType", "e5");
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(1000);
  const [stations, setStations] = useState(null);
  const [favorites, setFavorites] = useAsyncStorage('favorites', []);

  getStationList(50.563527, 8.500261, radius/1000, 'price').then(
    data => {
      for (let station of data) {
        station.favorite = favorites.includes(station.id);
      }
      setStations(data);
    },
    error => {
      console.log(error);
    },
  );

  return (
    <View style={{flex: 1}}>
      <MapHeader title={"Listenansicht"} radius={radius} setRadius={setRadius}/>
      <ScrollView
        style={{paddingHorizontal: 20}}
      >
        {stations && stations.map(station => (
            station.favorite && <List.Item
              key={station.id}
              title={station.brand}
              description={station.name}
              descriptionNumberOfLines={1}
              left={() => <List.Icon icon="star" />}
              right={() => (
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {station[fuelType]}€
                </Text>
              )}
            />
          ))}
          {stations && stations.map(station => (
            !station.favorite && <List.Item
              key={station.id}
              title={station.brand}
              description={station.name}
              descriptionNumberOfLines={1}
              left={() => <List.Icon icon="star-outline" />}
              right={() => (
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {station[fuelType]}€
                </Text>
              )}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});

export default ListViewComponent;
