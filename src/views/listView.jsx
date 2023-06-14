import {
  Appbar,
  List,
  Text,
  useTheme,
} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

import {DatePickerInput} from 'react-native-paper-dates';
import MapHeader from '../components/mapHeader';
import { ScrollView } from 'react-native';
import { getStationList } from '../api/tankerkoenig';
import useAsyncStorage from '../hooks/useAsyncStorage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useState} from 'react';

function ListViewComponent() {
  const [stations, setStations] = useState(null);
  const [favorites, setFavorites] = useAsyncStorage('favorites', []);
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  getStationList(50.563527, 8.500261, 5).then(
    data => {
      for(let station of data) {
        station.favorite = favorites.includes(station.id);
      }
      setStations(data);
    },
    error => {
      console.log(error);
    },
  );


  return (
    <View>
    <Appbar.Header>
      <Appbar.Content title="Tankstellen" />
    </Appbar.Header>
    <ScrollView style={{paddingHorizontal: 20}}>
      {stations && stations.map(station => (
        <List.Item
          key={station.id}
          title={station.brand}
          description={station.name}
          descriptionNumberOfLines={1}
          left={() => <List.Icon icon="star-outline" />}
          right={() => <Text style={{fontSize: 16, fontWeight: 'bold'}}>{station.e5}€</Text>}
        />
      ))}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
});

export default ListViewComponent;
