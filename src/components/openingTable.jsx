import {View} from 'react-native';
import {DataTable, Surface, Text} from 'react-native-paper';

const OpeningTable = ({openingTimes, overrides}) => {
  const sliceTime = (time) => {
    return time.slice(0, -3);
  };

  return (
    <View>
      <DataTable style={{marginTop: 10, borderRadius: 10}}>
        {openingTimes?.map((openingTime, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{openingTime.text}</DataTable.Cell>
            <DataTable.Cell numeric>
              {sliceTime(openingTime.start)}-{sliceTime(openingTime.end)} Uhr
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      {overrides && overrides.length > 0 ? (
        <Surface style={{borderRadius: 10}} mode="flat" elevation={2}>
          <Text style={{margin: 10}}>{overrides.join(', ')}</Text>
        </Surface>
      ) : null}
    </View>
  );
};

export default OpeningTable;
