import { View, Text } from 'react-native';

import { List } from 'react-native-paper';


function StationList() {
  return (
    <View>
      <List.Item
        title="First Item"
        description="Item description"
        left={props => <List.Icon {...props} icon="folder" />}
      />
    </View>
  );
}

export default StationList;
