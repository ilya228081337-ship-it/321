import { View, Text, StyleSheet } from 'react-native';
import { useGameContext } from '@/context/GameContext';

export default function GameUI() {
  const { gameState } = useGameContext();
  const { player, score, currentLevel, levelProgress, levelMaxProgress } = gameState;
  
  // Calculate level progress percentage
  const progressPercentage = (levelProgress / levelMaxProgress) * 100;
  
  return (
    <View style={styles.container}>
      {/* Level info */}
      <View style={styles.levelInfo}>
        <Text style={styles.levelText}>Level {currentLevel}</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      
      {/* Health bar */}
      <View style={styles.healthContainer}>
        <Text style={styles.healthText}>HP:</Text>
        <View style={styles.healthBarContainer}>
          <View 
            style={[
              styles.healthBar, 
              { width: `${player.health}%` },
              player.health < 30 && styles.lowHealth
            ]} 
          />
        </View>
        <Text style={styles.healthValue}>{player.health}</Text>
      </View>
      
      {/* Level progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Progress:</Text>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressValue}>{Math.floor(progressPercentage)}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  levelText: {
    fontFamily: 'PressStart2P',
    fontSize: 14,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scoreText: {
    fontFamily: 'VT323',
    fontSize: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  healthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  healthText: {
    fontFamily: 'VT323',
    fontSize: 18,
    color: '#fff',
    marginRight: 10,
    width: 40,
  },
  healthBarContainer: {
    flex: 1,
    height: 15,
    backgroundColor: '#333',
    borderRadius: 7,
    overflow: 'hidden',
  },
  healthBar: {
    height: '100%',
    backgroundColor: '#2ecc71',
    borderRadius: 7,
  },
  lowHealth: {
    backgroundColor: '#e74c3c',
  },
  healthValue: {
    fontFamily: 'VT323',
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
    width: 30,
    textAlign: 'right',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontFamily: 'VT323',
    fontSize: 18,
    color: '#fff',
    marginRight: 10,
    width: 40,
  },
  progressBarContainer: {
    flex: 1,
    height: 15,
    backgroundColor: '#333',
    borderRadius: 7,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 7,
  },
  progressValue: {
    fontFamily: 'VT323',
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
    width: 40,
    textAlign: 'right',
  },
});