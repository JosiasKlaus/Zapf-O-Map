import {Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CHIP_ICON_CLOSED = 'close-circle';
const CHIP_ICON_OPEN = 'check-circle';
const CHIP_COLOR_CLOSED = '#E92C2C';
const CHIP_COLOR_OPEN = '#00BA34';

const OpeningChip = ({isOpen}) => {
  return (
    <Chip
      style={{
        backgroundColor: isOpen ? CHIP_COLOR_OPEN + '1a' : CHIP_COLOR_CLOSED + '1a',
        borderColor: isOpen ? CHIP_COLOR_OPEN + '33' : CHIP_COLOR_CLOSED + '33',
      }}
      selectedColor={isOpen ? CHIP_COLOR_OPEN : CHIP_COLOR_CLOSED}
      mode="outlined"
      icon={() => (
        <Icon
          name={isOpen ? CHIP_ICON_OPEN : CHIP_ICON_CLOSED}
          color={isOpen ? CHIP_COLOR_OPEN : CHIP_COLOR_CLOSED}
          size={18}
        />
      )}>
      {isOpen ? 'Geöffnet' : 'Geschlossen'}
    </Chip>
  );
};

export default OpeningChip;
