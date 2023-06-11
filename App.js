import { PaperProvider } from 'react-native-paper';
import BottomNavigationComponent from './src/components/bottomNavigation.jsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function Main() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <BottomNavigationComponent />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default Main;