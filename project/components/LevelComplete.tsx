import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useGameContext } from '@/context/GameContext';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  onContinue: () => void;
}

export default function LevelComplete({ onContinue }: Props) {
  const { gameState } = useGameContext();
  const { currentLevel, score, percentageEarned } = gameState;
  
  return (
    <View style={styles.overlay}>
      <LinearGradient
        colors={['#4c0f35', '#2d0b1f']}
        style={styles.container}
      >
        <Text style={styles.title}>LEVEL {currentLevel} COMPLETE!</Text>
        
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Score: {score}</Text>
          <Text style={styles.statsText}>Percentage Earned: {percentageEarned}%</Text>
          <Text style={styles.statsText}>Customers Defeated: {Math.floor(score / 10)}</Text>
        </View>
        
        {currentLevel < 3 ? (
          <View>
            <Text style={styles.message}>
              The store's not clean yet! More customers are coming!
            </Text>
            
            <TouchableOpacity
              style={styles.button}
              onPress={onContinue}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>CONTINUE TO LEVEL {currentLevel + 1}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.message}>
              Congratulations! You've survived the day at Yaposha!
            </Text>
            <Text style={styles.message}>
              Your daily percentage: {percentageEarned}%
            </Text>
            
            <TouchableOpacity
              style={styles.button}
              onPress={onContinue}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>PLAY AGAIN</Text>
            </TouchableOpacity>
          </View>
        )}
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
    fontSize: 18,
    color: '#ff3e78',
    marginBottom: 20,
    textAlign: 'center',
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
  button: {
    backgroundColor: '#ff3e78',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ff94b8',
  },
  buttonText: {
    fontFamily: 'PressStart2P',
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});