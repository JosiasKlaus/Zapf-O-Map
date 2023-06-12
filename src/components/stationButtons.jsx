import {StyleSheet, View} from 'react-native';
import {Button, IconButton, Modal, Portal, Text} from 'react-native-paper';
import useAsyncStorage from '../hooks/useAsyncStorage';
import {useState} from 'react';

const StationButtons = ({stationId}) => {
  const [favorites, setFavorites] = useAsyncStorage('favorites', []);
  const [visible, setVisible] = useState(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  };

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
      {false ? (
        <IconButton icon="bell-ring" size={24} mode="contained" />
      ) : (
        <IconButton
          icon="bell-ring-outline"
          size={24}
          mode="contained"
          onPress={() => {
            setVisible(true);
          }}
        />
      )}
      <IconButton icon="directions" size={24} mode="contained" />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={containerStyle}>
          <Text style={styles.title}>Preisbenachrichtigung</Text>
          <View style={{flexDirection: 'row'}}>
            <Button
              style={{marginLeft: 'auto', marginRight: 5}}
              mode="outlined"
              onPress={() => setVisible(false)}>
              Abbrechen
            </Button>
            <Button style={{marginleft: 5}} mode="contained">
              Ok
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default StationButtons;
