import {Text, Button, IconButton} from 'react-native-paper';
import Modal from 'react-native';
import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStationDetails, getStationList} from '../api/tankerkoenig';
import {getLocation, calculateRegion} from '../utils/geolocation';

const DEFAULT_LATITUDE = 50.563527;
const DEFAULT_LONGITUDE = 8.500261;
const DEFAULT_RADIUS = 100;

const DEFAULT_REGION = {
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015,
};

function StationList() {
  const [stations, setStations] = useState(null);
  const [station, setStation] = useState(null);
  const [location, setLocation] = useState(DEFAULT_REGION);
  const [radius, setRadius] = useState(DEFAULT_RADIUS);

  if (location == DEFAULT_REGION) {
    getLocation(setLocation);
  }

  const getStations = () => {
    getStationList(location.latitude, location.longitude, radius).then(
      data => {
        setStations(data);
      },
      error => {
        console.log(error);
      },
    );
  };

  const styles = StyleSheet.create({
    backgroundStyle: {
      backgroundColor: '#f2f2f2',
    },
    filterButtonContainer: {
      height: 100,
      justifyContent: 'flex-end',
    },
    filterButton: {
      flex: 0.3,
    },
  });

  return (
    <SafeAreaView>
      <View style={styles.filterButtonContainer}>
        <Button
          style={styles.filterButton}
          icon={<Icon name="sort" size={10} color="black" />}
          mode="elevated"
          buttonColor="lightgrey"
          onPress={() => toggleVisibility()}
        />
      </View>
      <FlatList
        style={styles.backgroundStyle}
        data={stations}
        keyExtractor={item => item.id}
        refreshControl={getStations() /*Add refresh function */}
        renderItem={({item}) => (
          <ListElement
            brand={item.brand}
            price={item.e5}
            street={item.street}
            dist={item.dist}
          />
        )}
      />
    </SafeAreaView>
  );
}

function ListElement(props) {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    console.log('Parent');
    setExpanded(prevExpanded => !prevExpanded);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      height: !expanded ? 75 : 150,
      paddingHorizontal: 10,
      margin: 1,
      backgroundColor: '#fefefe',
      borderRadius: 15,
      borderColor: 'grey',
      marginLeft: 13,
      marginRight: 13,
      marginBottom: 3,
      marginTop: 3,
    },
    topContainer: {
      flexDirection: 'row',
      height: 75,
      paddingHorizontal: 10,
      margin: 1,
      borderBottomWidth: expanded ? 1 : 0,
      borderColor: 'grey',
    },
    leftContainer: {
      flex: 0.2,
      justifyContent: 'center',
      paddingRight: 3,
    },
    leftText: {
      fontSize: 25,
      color: 'black',
    },
    middleContainer: {
      flex: 0.6,
      paddingLeft: 5,
    },
    textContainer: {
      flex: 1,
    },
    middleText: {
      flex: 1,
      fontSize: 16,
      color: 'black',
    },
    middleTextBrand: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
    },
    rightContainer: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightText: {
      fontSize: 16,
      color: 'black',
    },
    bottomContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 7,
      gap: 10,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    button: {
      flex: 1,
      backgroundColor: 'grey',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'black',
      fontSize: 16,
    },
    buttonIcon: {
      alignItems: 'center',
      justifyContent: 'center', 
    }
  });

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container]}>
        <View style={styles.topContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.leftText} numberOfLines={1}>
              {props.price}
            </Text>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.middleTextBrand}>{props.brand}</Text>
              <Text style={styles.middleText} numberOfLines={2}>
                {props.street} ({props.dist}km)
              </Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <Button
              style={styles.buttonIcon}
              mode="elevated"
              buttonColor="lightgrey"
              onPress={
                console.log(
                  'clicked faves',
                ) /* TODO: Add to favorites function*/
              }>
              <Icon style={height=10} name="star-outline" size={30} color="grey" />
            </Button>
          </View>
        </View>
        {expanded && (
          <View style={styles.bottomContainer}>
            <View style={styles.buttonContainer}>
              <Button
              style={styles.buttonIcon}
                mode="elevated"
                buttonColor="lightgrey"
                onPress={() => console.log('w')}>
                <Icon name="directions" size={30} color="black" />
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                icon="directions"
                mode="elevated"
                buttonColor="lightgrey"
                onPress={() => console.log('w')}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                icon="directions"
                mode="elevated"
                buttonColor="lightgrey"
                onPress={() => console.log('w')}
              />
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default StationList;
