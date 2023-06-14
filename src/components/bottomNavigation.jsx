import {BottomNavigation} from 'react-native-paper';
import HistoryViewComponent from '../views/historyView.jsx';
import ListViewComponent from '../views/listView.jsx';
import MapViewComponent from '../views/mapView.jsx';
import React from 'react';
import SettingsViewComponent from '../views/settingsView.jsx';

const BottomNavigationComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'list', title: 'Tankstellen', focusedIcon: 'gas-station'},
    {key: 'map', title: 'Karte', focusedIcon: 'map-marker'},
    {key: 'history', title: 'Tankbuch', focusedIcon: 'notebook'},
    {key: 'settings', title: 'Einstellungen', focusedIcon: 'cog'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    list: ListViewComponent,
    map: MapViewComponent,
    history: HistoryViewComponent,
    settings: SettingsViewComponent,
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
