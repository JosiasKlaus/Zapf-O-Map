import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const StationMarker = ({
  title,
  price,
  background = '#184f8b',
  border = '#0f3257',
  text = '#ffffff',
}) => {
  return (
    <View>
      <View
        style={[
          styles.bubble,
          {backgroundColor: background, borderColor: border},
        ]}>
        <Text style={[styles.title, {color: text}]} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.pricing}>
          <Text style={[styles.amount, {color: text}]}>{price}</Text>
          <Text style={[styles.euro, {color: text}]}>€</Text>
        </View>
      </View>
      <View style={[styles.arrowBorder, {borderTopColor: border}]} />
      <View style={[styles.arrow, {borderTopColor: background}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 0.5,
  },
  pricing: {
    flexDirection: 'row',
  },
  title: {
    maxWidth: 75,
    fontSize: 12,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  euro: {
    marginTop: 1.5,
    marginLeft: 1.5,
    fontSize: 10,
    fontWeight: 'bold',
  },
  arrowBorder: {
    borderColor: 'transparent',
    borderWidth: 6,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  arrow: {
    borderColor: 'transparent',
    borderWidth: 6,
    alignSelf: 'center',
    marginTop: -12.5,
  },
});

export default StationMarker;
