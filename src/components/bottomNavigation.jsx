import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import StationsList from '../views/listView.jsx';
import MapScreen from "../views/mapView.jsx";

function BottomNavigationComponent() {
  const Tab = createMaterialBottomTabNavigator();

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
      {/* <Tab.Screen
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
      /> */}
    </Tab.Navigator>
  );
}

export default BottomNavigationComponent;
