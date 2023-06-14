import {StyleSheet, View} from 'react-native';
import {useState} from 'react';
import {
  Appbar,
  Button,
  DataTable,
  FAB,
  Modal,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import useAsyncStorage from '../hooks/useAsyncStorage';
import {DatePickerInput} from 'react-native-paper-dates';
import { ScrollView } from 'react-native';

function HistoryView() {
  const [history, setHistory] = useAsyncStorage('history', []);
  const [visible, setVisible] = useState(false);

  const [modalDate, setModalDate] = useState(new Date());
  const [modalPrice, setModalPrice] = useState(null);
  const [modalAmount, setModalAmount] = useState(null);

  const resetModal = () => {
    setModalDate(new Date());
    setModalPrice(null);
    setModalAmount(null);
  };

  const theme = useTheme();
  const containerStyle = {
    backgroundColor: theme.colors.surface,
    padding: 20,
    margin: 20,
    borderRadius: 10,
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Tankbuch" />
      </Appbar.Header>
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Datum</DataTable.Title>
            <DataTable.Title numeric>Preis</DataTable.Title>
            <DataTable.Title numeric>Getankt</DataTable.Title>
            <DataTable.Title numeric>Preis/Liter</DataTable.Title>
          </DataTable.Header>
          {history.map((entry, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{entry.date}</DataTable.Cell>
              <DataTable.Cell numeric>
                {entry.price.replace('.', ',')}€
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {entry.amount.replace('.', ',')}L
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {(entry.price / entry.amount).toFixed(2).replace('.', ',')}€
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => {
            setVisible(false);
            resetModal();
          }}
          contentContainerStyle={containerStyle}>
          <Text style={{fontSize: 20, marginBottom: 20}}>
            Tankvorgang Hinzufügen
          </Text>
          <DatePickerInput
            style={{marginBottom: 10}}
            locale="de"
            label="Tankdatum"
            value={modalDate}
            onChange={value => setModalDate(value)}
            inputMode="start"
            mode="outlined"
          />
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={{flex: 1, marginRight: 10}}
              label="Preis"
              mode="outlined"
              value={modalPrice}
              onChangeText={value => setModalPrice(value.replace(',', '.'))}
              numberOfLines={1}
              keyboardType="numeric"
            />
            <TextInput
              style={{flex: 1, marginLeft: 10}}
              label="Menge"
              mode="outlined"
              value={modalAmount}
              onChangeText={value => setModalAmount(value)}
              numberOfLines={1}
              keyboardType="numeric"
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Button
              style={{marginLeft: 'auto'}}
              mode="contained"
              onPress={() => {
                if(modalPrice == null || modalAmount == null) return;
                setVisible(false);
                resetModal();
                setHistory([
                  ...history,
                  {
                    date: modalDate.toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    }),
                    price: (modalPrice.replace(',', '.') / 1).toFixed(2),
                    amount: (modalAmount.replace(',', '.') / 1).toFixed(2),
                  },
                ]);
              }}>
              Hinzufügen
            </Button>
          </View>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setVisible(true)}
        onLongPress={() => setHistory([])}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HistoryView;
