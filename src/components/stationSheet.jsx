import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';
import {Image, View} from 'react-native';
import {Chip, DataTable, IconButton, Surface, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { getStationDetails } from '../api/tankerkoenig';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// TODO: Get image from Maps API
// TODO: Get station data from API (detailed info)

const CHIP_ICON_CLOSED = 'close-circle';
const CHIP_ICON_OPEN = 'check-circle';
const CHIP_COLOR_CLOSED = '#E92C2C';
const CHIP_COLOR_OPEN = '#00BA34';

const StationSheet = ({initStation}) => {
  const bottomSheetRef = useRef(null);
  const theme = useTheme();

  const [station, setStation] = useState(null);

  useEffect(() => {
    bottomSheetRef.current.close();
    if(initStation) {
      getStationDetails(initStation.id).then(data => {
        data.dist = initStation.dist;
        setStation(data);
        bottomSheetRef.current.expand();
      });
    } else {
      setStation(null);
    }
  }, [initStation]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      style={{
        paddingHorizontal: 20,
      }}
      backgroundStyle={{
        backgroundColor: theme.colors.surface,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.onSurface,
      }}
      snapPoints={[24, 520]}
      activeOffsetY={[-1, 1]}
      failOffsetX={[-5, 5]}>
      <BottomSheetScrollView contentContainerStyle={{flexGrow: 0}}>
        <Image
          style={{width: '100%', height: 180, borderRadius: 10}}
          source={require('../assets/aral.jpg')}
        />
        <View style={{flexDirection: 'row', margin: 10}}>
          <View>
            <Text style={styles.title}>{station?.brand}</Text>
            <Text style={styles.address}>
              {station?.street} {station?.houseNumber}
            </Text>
            <Text style={styles.address}>
              {station?.postCode} {station?.place}
            </Text>
          </View>
          <View style={{marginLeft: 'auto'}}>
            <Chip
              style={{
                backgroundColor: station?.isOpen ? CHIP_COLOR_OPEN + '1a' : CHIP_COLOR_CLOSED + '1a',
                borderColor: station?.isOpen ? CHIP_COLOR_OPEN + '33' : CHIP_COLOR_CLOSED + '33',
              }}
              selectedColor={
                station?.isOpen ? CHIP_COLOR_OPEN : CHIP_COLOR_CLOSED
              }
              mode="outlined"
              icon={() => (
                <Icon
                  name={station?.isOpen ? CHIP_ICON_OPEN : CHIP_ICON_CLOSED}
                  color={station?.isOpen ? CHIP_COLOR_OPEN : CHIP_COLOR_CLOSED}
                  size={18}
                />
              )}
            >
              {station?.isOpen ? 'Geöffnet' : 'Geschlossen'}
            </Chip>
            <Text style={styles.distance}>{station?.dist}km entfernt</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <IconButton icon="directions" size={24} mode="contained" />
          <IconButton icon="phone" size={24} mode="contained" />
          <IconButton icon="web" size={24} mode="contained" />
        </View>
        <View>
          <Text style={[styles.title, {marginLeft: 10, marginTop: 10}]}>
            Preise
          </Text>
          <DataTable style={styles.dataTable}>
            <DataTable.Row>
              <DataTable.Cell>E5</DataTable.Cell>
              <DataTable.Cell numeric>{station?.e5}€</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>E10</DataTable.Cell>
              <DataTable.Cell numeric>{station?.e10}€</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Diesel</DataTable.Cell>
              <DataTable.Cell numeric>{station?.diesel}€</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
        {station?.openingTimes ? (
          <View>
            <Text style={[styles.title, {marginLeft: 10, marginTop: 10}]}>
              Öffnungszeiten
            </Text>
            <DataTable style={styles.dataTable}>
              {station.openingTimes.map((openingTime, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{openingTime.text}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {openingTime.start.slice(0, -3)} -{' '}
                    {openingTime.end.slice(0, -3)} Uhr
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
            {station.overrides.length > 0 ? (
              <Surface style={{borderRadius: 10}} mode="flat" elevation={2}>
                <Text style={{margin: 10}}>{station.overrides.join(', ')}</Text>
              </Surface>
            ) : null}
          </View>
        ) : null}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    fontWeight: 'light',
  },
  distance: {
    marginLeft: 'auto',
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'light',
  },
  dataTable: {
    marginVertical: 10,
  },
});

export default StationSheet;
