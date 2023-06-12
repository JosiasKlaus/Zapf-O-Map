import {DataTable} from 'react-native-paper';

const PricingTable = ({prices}) => {
  return (
    <DataTable style={{marginTop: 10, borderRadius: 10}}>
      {Object.entries(prices).map(([key, value], index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell>{key}</DataTable.Cell>
          <DataTable.Cell numeric>{value}€</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

export default PricingTable;
