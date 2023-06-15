import {Appbar, Banner, Button, IconButton, Text, TextInput, useTheme} from 'react-native-paper';
import {Image, View} from 'react-native';
import {useState} from 'react';
import Slider from '@react-native-community/slider';

const MapHeader = ({title, radius, setRadius}) => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const theme = useTheme();
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title={title} />
        <Appbar.Action icon="menu" onPress={() => {setHeaderVisible(!headerVisible)}} />
      </Appbar.Header>
      {headerVisible ? (
        <View
          style={{
            flexDirection: 'column',
            marginHorizontal: 0,
            marginTop: 0,
            justifyContent: 'center',
            flex: 0
          }}
        >
          {/* Disabled beacuse error in addressToCoordinates always returns undefined for RN greater then 0.69 (github issue #1071) */}
          {/* <View style={{flexDirection: 'row', paddingHorizontal: 20 }}>
            <TextInput
              style={{height: 40, flex: 1, marginRight: 10}}
              label="Adresse oder Ort"
              mode="outlined"
              compact={true}
              numberOfLines={1}
            />
            <IconButton
              icon="magnify"
              size={24}
              mode='contained'
              compact={true}
              onPress={() => console.log('Pressed')} />
          </View> */}
          <Text style={{marginLeft: 20, marginTop: 20}}>Radius ({radius/1000}KM)</Text>
          <Slider
            style={{marginHorizontal: 10, marginTop: 10, marginBottom: 20}}
            minimumValue={1000}
            maximumValue={15000}
            step={250}
            value={radius}
            onValueChange={value => setRadius(value)}
            thumbTintColor={theme.colors.primary}
            minimumTrackTintColor={theme.colors.onBackground}
            maximumTrackTintColor={theme.colors.background}
          />
        </View>
      ) : null}
    </View>
  );
};

export default MapHeader;
