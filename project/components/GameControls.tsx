import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useGameContext } from '@/context/GameContext';
import { ArrowLeft, ArrowRight, ArrowDown, ArrowUp, Zap as ZapIcon } from 'lucide-react-native';

export default function GameControls() {
  const { movePlayer, attack } = useGameContext();
  
  return (
    <View style={styles.container}>
      {/* Movement controls */}
      <View style={styles.movementControls}>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => movePlayer('left')}
          activeOpacity={0.7}
        >
          <ArrowLeft color="#fff" size={32} />
        </TouchableOpacity>
        
        <View style={styles.verticalControls}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => movePlayer('up')}
            activeOpacity={0.7}
          >
            <ArrowUp color="#fff" size={32} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => movePlayer('down')}
            activeOpacity={0.7}
          >
            <ArrowDown color="#fff" size={32} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => movePlayer('right')}
          activeOpacity={0.7}
        >
          <ArrowRight color="#fff" size={32} />
        </TouchableOpacity>
      </View>
      
      {/* Attack controls */}
      <View style={styles.actionControls}>
        <TouchableOpacity 
          style={styles.attackButton}
          onPress={attack}
          activeOpacity={0.7}
        >
          <ZapIcon color="#fff" size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  movementControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalControls: {
    marginHorizontal: 10,
  },
  controlButton: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  actionControls: {
    justifyContent: 'center',
  },
  attackButton: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 62, 120, 0.8)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});