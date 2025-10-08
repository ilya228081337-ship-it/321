import { useEffect } from 'react';
import { View, StyleSheet, Dimensions, BackHandler } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameContext } from '@/context/GameContext';
import GameControls from '@/components/GameControls';
import Player from '@/components/Player';
import Enemies from '@/components/Enemies';
import GameUI from '@/components/GameUI';
import LevelComplete from '@/components/LevelComplete';
import GameOver from '@/components/GameOver';
import LevelBackground from '@/components/LevelBackground';

export default function GameScreen() {
  const router = useRouter();
  const { 
    gameState, 
    updateGame,
    isGameOver,
    isLevelComplete,
    restartLevel,
    goToNextLevel
  } = useGameContext();
  
  // Set up game loop
  useEffect(() => {
    let frameId: number;
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    
    const gameLoop = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;
      
      if (deltaTime >= frameInterval) {
        updateGame();
        lastTime = timestamp;
      }
      
      frameId = requestAnimationFrame(gameLoop);
    };
    
    frameId = requestAnimationFrame(gameLoop);
    
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [updateGame]);
  
  // Handle back button
  useEffect(() => {
    const backAction = () => {
      router.back();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [router]);

  return (
    <View style={styles.container}>
      <LevelBackground level={gameState.currentLevel} />
      
      {/* Game elements */}
      <View style={styles.gameArea}>
        <Player />
        <Enemies />
      </View>
      
      {/* UI overlay */}
      <GameUI />
      
      {/* Controls */}
      <GameControls />
      
      {/* Modals */}
      {isLevelComplete && <LevelComplete onContinue={goToNextLevel} />}
      {isGameOver && <GameOver onRestart={restartLevel} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative',
  },
  gameArea: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'transparent',
  },
});