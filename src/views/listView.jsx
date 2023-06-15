import { View } from 'react-native';
import { List, Text } from 'react-native-paper';

import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { getStationList } from '../api/tankerkoenig';
import useAsyncStorage from '../hooks/useAsyncStorage';
import MapHeader from '../components/mapHeader';
import { getLocation } from '../utils/geolocation';

function ListViewComponent() {
  const [fuelType, setFuelType] = useAsyncStorage("fuelType", "e5");
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(1000);
  const [stations, setStations] = useState(null);
  const [favorites, setFavorites] = useAsyncStorage('favorites', []);

  if(!location) {
    getLocation(setLocation);
  }

  useEffect(() => {
    if(location) {
      getStationList(location.latitude, location.longitude, radius/1000).then(
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
    }
  }, [location, radius]);

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

export default ListViewComponent;
