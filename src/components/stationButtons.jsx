import {Linking, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import useAsyncStorage from '../hooks/useAsyncStorage';

const StationButtons = ({stationId, lat, lng, brand}) => {
  const [favorites, setFavorites] = useAsyncStorage('favorites', []);

  return (
    <View style={{flexDirection: 'row'}}>
      {favorites.includes(stationId) ? (
        <IconButton
          icon="star"
          size={24}
          mode="contained"
          onPress={() => {
            setFavorites(favorites.filter(item => item !== stationId));
          }}
        />
      ) : (
        <IconButton
          icon="star-outline"
          size={24}
          mode="contained"
          onPress={() => {
            setFavorites([...favorites, stationId]);
          }}
        />
      )}
      <IconButton
        icon="directions"
        size={24}
        mode="contained"
        onPress={() => {
          const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
          const latLng = `${lat},${lng}`;
          const url = Platform.select({
            ios: `${scheme}${brand}@${latLng}`,
            android: `${scheme}${latLng}(${brand})`
          });
          Linking.openURL(url);
        }}
      />
    </View>
  );
};

export default StationButtons;
