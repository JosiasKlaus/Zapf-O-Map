import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import StationsList from './src/components/stationList.jsx';
import MapScreen from "./src/views/mapView.jsx";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Stations"
        onPress={() => navigation.navigate('Stations')}
      />
    </View>
  );
}

function HistoryScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Stations"
        onPress={() => navigation.navigate('Stations')}
      />
    </View>
  );
}


const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Stations"
        component={StationsList}
        options={{
          tabBarLabel: 'Tankstellen',
          tabBarBadge: '1,799€',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="gas-station" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Karte',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker" color={color} size={26} />
          )
        }}
       />
      <Tab.Screen
       name="History"
       component={HistoryScreen}
       options={{
         tabBarLabel: 'Tankbuch',
         tabBarIcon: ({ color }) => (
           <MaterialCommunityIcons name="notebook" color={color} size={26} />
         )
       }}
      />
      <Tab.Screen
       name="Settings"
       component={HomeScreen}
       options={{
         tabBarLabel: 'Einstellungen',
         tabBarIcon: ({ color }) => (
           <MaterialCommunityIcons name="cog" color={color} size={26} />
         )
       }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function Main() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Stations" component={StationsList} options={{ title: 'Tankstellen' }} />
        </Stack.Navigator> */}
        <MyTabs />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default Main;