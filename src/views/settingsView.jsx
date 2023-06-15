import { Appbar, Text } from "react-native-paper";
import { View } from "react-native";
import useAsyncStorage from "../hooks/useAsyncStorage";
import DropDown from "react-native-paper-dropdown";
import { useState } from "react";

const SettingsViewComponent = () => {
  const [fuelType, setFuelType] = useAsyncStorage("fuelType", "e5");
  const [showDropDown, setShowDropDown] = useState(false);
  const fuelTypeList = [
    { label: "Super E5", value: "e5" },
    { label: "Super E10", value: "e10" },
    { label: "Diesel", value: "diesel" },
  ];

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Einstellungen" />
      </Appbar.Header>
      <View style={{ marginHorizontal: 20 }}>
        <DropDown
          label={"Standard Kraftstoff"}
          mode={"outlined"}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={fuelType}
          setValue={setFuelType}
          list={fuelTypeList}
        />
      </View>
    </View>
  );
}

export default SettingsViewComponent;