import StationsList from '../views/listView.jsx';
import MapScreen from '../views/mapView.jsx';
import {BottomNavigation} from 'react-native-paper';
import React from 'react';
import HistoryView from '../views/historyView.jsx';

const BottomNavigationComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'list', title: 'Tankstellen', focusedIcon: 'gas-station'},
    {key: 'map', title: 'Karte', focusedIcon: 'map-marker'},
    {key: 'history', title: 'Tankbuch', focusedIcon: 'notebook'},
    {key: 'settings', title: 'Einstellungen', focusedIcon: 'cog'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    list: StationsList,
    map: MapScreen,
    history: HistoryView,
    settings: StationsList,
  });

  return (
    <BottomNavigation
      shifting={true}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

export default BottomNavigationComponent;
