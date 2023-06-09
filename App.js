import { PaperProvider } from 'react-native-paper';
import BottomNavigationComponent from './src/components/bottomNavigation.jsx';

function Main() {
  return (
    <PaperProvider>
      <BottomNavigationComponent />
    </PaperProvider>
  );
}

export default Main;