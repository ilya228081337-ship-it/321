import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useGameContext } from '@/context/GameContext';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  onRestart: () => void;
}

export default function GameOver({ onRestart }: Props) {
  const router = useRouter();
  const { gameState } = useGameContext();
  const { currentLevel, score } = gameState;
  
  return (
    <View style={styles.overlay}>
      <LinearGradient
        colors={['#4c0f35', '#2d0b1f']}
        style={styles.container}
      >
        <Text style={styles.title}>GAME OVER</Text>
        
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Level: {currentLevel}</Text>
          <Text style={styles.statsText}>Score: {score}</Text>
          <Text style={styles.statsText}>Customers Defeated: {Math.floor(score / 10)}</Text>
        </View>
        
        <Text style={styles.message}>
          The customers were too much for Ira to handle!
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={onRestart}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>TRY AGAIN</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.replace('/')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>MAIN MENU</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  container: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'PressStart2P',
    fontSize: 24,
    color: '#ff3e78',
    marginBottom: 20,
  },
  statsContainer: {
    marginBottom: 20,
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
  },
  statsText: {
    fontFamily: 'VT323',
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
  },
  message: {
    fontFamily: 'VT323',
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#ff3e78',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ff94b8',
  },
  secondaryButton: {
    backgroundColor: '#4a246b',
    borderColor: '#7e42b5',
  },
  buttonText: {
    fontFamily: 'PressStart2P',
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});