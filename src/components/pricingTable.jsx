import {StyleSheet, View} from 'react-native';
import {DataTable, Text} from 'react-native-paper';

const PricingTable = ({prices}) => {
  return (
    <View>
      <Text style={styles.title}>Preise</Text>
      <DataTable style={styles.dataTable}>
        {Object.entries(prices).map(([key, value], index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{key}</DataTable.Cell>
            <DataTable.Cell numeric>{value}€</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  dataTable: {
    marginTop: 10,
    borderRadius: 10,
  },
});

export default PricingTable;
