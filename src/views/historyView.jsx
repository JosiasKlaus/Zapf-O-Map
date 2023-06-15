import {
  Appbar,
  Button,
  DataTable,
  FAB,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

import {DatePickerInput, en, he} from 'react-native-paper-dates';
import { ScrollView } from 'react-native';
import useAsyncStorage from '../hooks/useAsyncStorage';
import {useRef, useState} from 'react';
import { Camera } from 'react-native-vision-camera';
import { useCameraDevices } from 'react-native-vision-camera';
import * as RNFS from 'react-native-fs';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import FileViewer from "react-native-file-viewer";


const HistoryViewComponent = () => {
  const [history, setHistory] = useAsyncStorage('history', []);
  const [visible, setVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);

  const [modalDate, setModalDate] = useState(new Date());
  const [modalPrice, setModalPrice] = useState(null);
  const [modalAmount, setModalAmount] = useState(null);
  const [modalPhoto, setModalPhoto] = useState(null);

  let cameraPermission = false;
  Camera.getCameraPermissionStatus().then(status => {
    if (status === 'authorized') {
      cameraPermission = true;
    } else {
      Camera.requestCameraPermission().then(status => {
        cameraPermission = status === 'authorized';
      });
    }
  });
  const devices = useCameraDevices()
  const device = devices.back
  const camera = useRef(null)

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
            <DataTable.Row key={index} onPress={() => {
              if(entry.photo) {
                FileViewer.open(entry.photo, {showOpenWithDialog: true});
              }
            }}>
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
            <IconButton
              icon="camera"
              onPress={() => {
                if (cameraPermission) {
                  setCameraVisible(true);
                }
              }}
            />
            <Button
              style={{marginLeft: 'auto', alignSelf: 'center'}}
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
                    photo: modalPhoto,
                  },
                ]);
              }}>
              Hinzufügen
            </Button>
          </View>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          style={{...StyleSheet.absoluteFill}}
          visible={cameraVisible}
          onDismiss={() => setCameraVisible(false)}
          contentContainerStyle={{
            backgroundColor: theme.colors.surface,
            width: '100%',
            height: '100%'
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFillObject}
              device={device}
              isActive={cameraVisible}
              photo={true}
            />
            <FAB
              style={{marginTop: 'auto', marginBottom: 20, borderRadius: 50}}
              icon="camera"
              customSize={64}
              onPress={() => {
                camera.current.takePhoto().then((data) => {
                  RNFS.readFile(data.path, 'base64').then((data) => {
                    const path = RNFS.DocumentDirectoryPath + '/' + uuidv4() + '.jpg';
                    RNFS.writeFile(path, data, 'base64');
                    setModalPhoto(path);
                  });
                  setCameraVisible(false);
                });
              }}
            />
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

export default HistoryViewComponent;
