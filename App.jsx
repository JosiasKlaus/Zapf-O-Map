import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigationComponent from "./src/components/bottomNavigation.jsx";

function Main() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <BottomNavigationComponent />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default Main;