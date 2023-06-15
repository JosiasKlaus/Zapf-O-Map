import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {IconButton, Text} from 'react-native-paper';
import {Image, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import OpeningChip from './openingChip';
import OpeningTable from './openingTable';
import PricingTable from './pricingTable';
import StationButtons from './stationButtons';
import {StyleSheet} from 'react-native';
import {getStationDetails} from '../api/tankerkoenig';
import {useTheme} from 'react-native-paper';

// TODO: Get image from Maps API
const getStationImage = (brand) => {
  if (!brand) return require('../assets/images/other.jpg');
  brand = brand.toLowerCase();
  switch(brand) {
    case 'aral':
      return require('../assets/images/aral.jpg');
    case 'shell':
      return require('../assets/images/shell.jpg');
    case 'total':
      return require('../assets/images/total.jpg');
    case 'esso':
      return require('../assets/images/esso.jpg');
    case 'avia':
      return require('../assets/images/avia.jpg');
    case 'jet':
      return require('../assets/images/jet.jpg');
    default:
      return require('../assets/images/other.jpg');
  }
}

const StationSheet = ({initStation, initSetStation}) => {
  const [station, setStation] = useState(null);
  const bottomSheetRef = useRef(null);
  const theme = useTheme();

  if(!initStation) {
    bottomSheetRef.current?.close();
  }

  useEffect(() => {
    bottomSheetRef.current.close();
    if (initStation) {
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
        marginHorizontal: 20,
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
      failOffsetX={[-5, 5]}
      onChange={(value) => { if (value == 0) { initSetStation(null); }}}>
      <BottomSheetScrollView contentContainerStyle={{flexGrow: 0}}>
        <Image
          style={{width: '100%', height: 180, borderRadius: 10}}
          source={getStationImage(station?.brand)}
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
            <OpeningChip isOpen={station?.isOpen} />
            <Text style={styles.distance}>{station?.dist}km entfernt</Text>
          </View>
        </View>
        <StationButtons
          stationId={station?.id}
          lat={station?.lat}
          lng={station?.lng}
          brand={station?.brand}
        />
        <Text style={[styles.title, {marginTop: 10, marginLeft: 10}]}>Preise</Text>
        <PricingTable
          prices={{
            'Super E5': station?.e5,
            'Super E10': station?.e10,
            'Diesel': station?.diesel,
          }}
        />
        <Text style={[styles.title, {marginTop: 10, marginLeft: 10}]}>Öffnungszeiten</Text>
        {station?.wholeDay ? (
          <Text style={{margin: 10}}>Diese Tankstelle ist rund um die Uhr geöffnet</Text>
        ) : (
          <OpeningTable
            openingTimes={station?.openingTimes}
            overrides={station?.overrides}
            wholeDay={station?.wholeDay}
          />
        )}
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
