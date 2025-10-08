import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { GameState, Enemy, Player, Level, Weapon } from '@/types/gameTypes';

const { width, height } = Dimensions.get('window');

// Sound effects
let attackSound: Audio.Sound | null = null;
let hitSound: Audio.Sound | null = null;
let gameOverSound: Audio.Sound | null = null;
let levelCompleteSound: Audio.Sound | null = null;

// Load sounds
async function loadSounds() {
  if (Platform.OS === 'web') {
    console.log('Audio disabled on web platform');
    return;
  }

  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });

    const loadSound = async (uri: string, volume: number) => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri },
          { volume },
          undefined,
          true
        );
        return sound;
      } catch (err) {
        console.warn(`Failed to load sound from ${uri}:`, err);
        return null;
      }
    };

    const [attack, hit, gameOver, levelComplete] = await Promise.all([
      loadSound('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', 0.5),
      loadSound('https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3', 0.3),
      loadSound('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3', 0.7),
      loadSound('https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3', 0.6),
    ]);

    attackSound = attack;
    hitSound = hit;
    gameOverSound = gameOver;
    levelCompleteSound = levelComplete;
  } catch (error) {
    console.warn('Error setting up audio:', error);
  }
}

// Initial game state
const initialGameState: GameState = {
  player: {
    x: width / 2 - 30,
    y: height - 150,
    width: 60,
    height: 80,
    health: 100,
    direction: 'right',
    isAttacking: false,
    weapon: 'scanner',
    cooldown: 0,
  },
  enemies: [],
  score: 0,
  currentLevel: 1,
  levelProgress: 0,
  levelMaxProgress: 100,
  gameTime: 0,
  percentageEarned: 0,
};

// Level configurations
const levelConfigs: Record<number, Level> = {
  1: {
    name: 'Store Entrance',
    maxEnemies: 5,
    spawnRate: 120, // frames between spawns
    enemyTypes: ['regular'],
    background: 'entrance',
    maxProgress: 100,
  },
  2: {
    name: 'Shelf Area',
    maxEnemies: 8,
    spawnRate: 90,
    enemyTypes: ['regular', 'impatient'],
    background: 'shelves',
    maxProgress: 150,
  },
  3: {
    name: 'Checkout Counter',
    maxEnemies: 12,
    spawnRate: 60,
    enemyTypes: ['regular', 'impatient', 'karen'],
    background: 'checkout',
    maxProgress: 200,
  },
};

// Weapons configurations
const weaponConfigs: Record<string, Weapon> = {
  scanner: {
    name: 'Price Scanner',
    damage: 20,
    range: 100,
    cooldown: 45,
  },
  receipt: {
    name: 'Receipt Roll',
    damage: 15,
    range: 150,
    cooldown: 30,
  },
  bag: {
    name: 'Shopping Bag',
    damage: 30,
    range: 80,
    cooldown: 60,
  },
};

// Context interface
interface GameContextType {
  gameState: GameState;
  movePlayer: (direction: 'left' | 'right' | 'up' | 'down') => void;
  attack: () => void;
  updateGame: () => void;
  isGameOver: boolean;
  isLevelComplete: boolean;
  restartLevel: () => void;
  goToNextLevel: () => void;
  resetGame: () => void;
}

// Create context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({...initialGameState});
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  
  // Load sounds when component mounts
  useEffect(() => {
    loadSounds();
    return () => {
      // Cleanup sounds when component unmounts
      attackSound?.unloadAsync();
      hitSound?.unloadAsync();
      gameOverSound?.unloadAsync();
      levelCompleteSound?.unloadAsync();
    };
  }, []);

  // Reset game to initial state
  const resetGame = useCallback(() => {
    setGameState({...initialGameState});
    setIsGameOver(false);
    setIsLevelComplete(false);
  }, []);
  
  // Move player in specified direction
  const movePlayer = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    setGameState(prevState => {
      const newPlayer = { ...prevState.player };
      
      const movementSpeed = 10;
      
      switch (direction) {
        case 'left':
          newPlayer.x = Math.max(0, newPlayer.x - movementSpeed);
          newPlayer.direction = 'left';
          break;
        case 'right':
          newPlayer.x = Math.min(width - newPlayer.width, newPlayer.x + movementSpeed);
          newPlayer.direction = 'right';
          break;
        case 'up':
          newPlayer.y = Math.max(height / 3, newPlayer.y - movementSpeed);
          break;
        case 'down':
          newPlayer.y = Math.min(height - newPlayer.height - 50, newPlayer.y + movementSpeed);
          break;
      }
      
      return { ...prevState, player: newPlayer };
    });
  }, []);
  
  // Player attack action
  const attack = useCallback(async () => {
    setGameState(prevState => {
      if (prevState.player.cooldown > 0) return prevState;
      
      const weapon = weaponConfigs[prevState.player.weapon];
      
      // Play attack sound
      attackSound?.playFromPositionAsync(0);
      
      return {
        ...prevState,
        player: {
          ...prevState.player,
          isAttacking: true,
          cooldown: weapon.cooldown,
        }
      };
    });
  }, []);
  
  // Spawn a new enemy
  const spawnEnemy = useCallback((level: number) => {
    const config = levelConfigs[level];
    const enemyTypes = config.enemyTypes;
    const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    
    let health = 50;
    let speed = 1;
    let size = 50;
    
    switch (type) {
      case 'impatient':
        health = 40;
        speed = 1.5;
        break;
      case 'karen':
        health = 80;
        speed = 0.8;
        size = 60;
        break;
    }
    
    const enemy: Enemy = {
      id: Date.now().toString(),
      type,
      x: Math.random() * (width - size),
      y: 0,
      width: size,
      height: size,
      health,
      maxHealth: health,
      speed,
    };
    
    return enemy;
  }, []);
  
  // Check collision between player and enemy
  const checkCollision = useCallback((player: Player, enemy: Enemy) => {
    return (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    );
  }, []);
  
  // Check if player attack hits an enemy
  const checkAttackHit = useCallback((player: Player, enemy: Enemy) => {
    const weapon = weaponConfigs[player.weapon];
    const attackRange = weapon.range;
    
    // Check if enemy is in range based on player direction
    if (player.direction === 'left') {
      return (
        player.x - attackRange < enemy.x + enemy.width &&
        player.x > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
      );
    } else {
      return (
        player.x + player.width + attackRange > enemy.x &&
        player.x < enemy.x + enemy.width &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
      );
    }
  }, []);

  // Update game state for each frame
  const updateGame = useCallback(() => {
    setGameState(prevState => {
      if (isGameOver || isLevelComplete) return prevState;
      
      const levelConfig = levelConfigs[prevState.currentLevel];
      const newState = { ...prevState };
      
      // Update game time
      newState.gameTime += 1;
      
      // Update player cooldown
      if (newState.player.cooldown > 0) {
        newState.player.cooldown -= 1;
      }
      
      // Reset attack state if cooldown is finished
      if (newState.player.cooldown === 0) {
        newState.player.isAttacking = false;
      }
      
      // Spawn enemies
      if (newState.gameTime % levelConfig.spawnRate === 0 && 
          newState.enemies.length < levelConfig.maxEnemies) {
        newState.enemies.push(spawnEnemy(prevState.currentLevel));
      }
      
      // Update enemies
      newState.enemies = newState.enemies.map(enemy => {
        const updatedEnemy = { ...enemy };
        
        // Move enemy down
        updatedEnemy.y += enemy.speed;
        
        // Check for player attack hit
        if (newState.player.isAttacking && checkAttackHit(newState.player, enemy)) {
          const weapon = weaponConfigs[newState.player.weapon];
          updatedEnemy.health -= weapon.damage;
          
          // Play hit sound
          hitSound?.playFromPositionAsync(0);
        }
        
        return updatedEnemy;
      });
      
      // Remove dead enemies and update score
      const deadEnemies = newState.enemies.filter(enemy => enemy.health <= 0);
      newState.enemies = newState.enemies.filter(enemy => enemy.health > 0 && enemy.y < height);
      
      // Update score based on dead enemies
      if (deadEnemies.length > 0) {
        newState.score += deadEnemies.length * 10;
        newState.levelProgress += deadEnemies.length * 5;
      }
      
      // Check for player collision with enemies
      for (const enemy of newState.enemies) {
        if (checkCollision(newState.player, enemy)) {
          newState.player.health -= 1;
        }
      }
      
      // Check game over condition
      if (newState.player.health <= 0) {
        gameOverSound?.playFromPositionAsync(0);
        setIsGameOver(true);
      }
      
      // Check level completion
      if (newState.levelProgress >= levelConfig.maxProgress) {
        levelCompleteSound?.playFromPositionAsync(0);
        newState.percentageEarned += 5 * newState.currentLevel;
        setIsLevelComplete(true);
      }
      
      return newState;
    });
  }, [isGameOver, isLevelComplete, spawnEnemy, checkCollision, checkAttackHit]);
  
  // Restart current level
  const restartLevel = useCallback(() => {
    setGameState(prevState => ({
      ...initialGameState,
      currentLevel: prevState.currentLevel,
      percentageEarned: prevState.percentageEarned,
    }));
    setIsGameOver(false);
    setIsLevelComplete(false);
  }, []);
  
  // Go to next level
  const goToNextLevel = useCallback(() => {
    setGameState(prevState => {
      const nextLevel = prevState.currentLevel + 1;
      
      // Check if there's a next level
      if (!levelConfigs[nextLevel]) {
        // Game completed, return to level 1 with accumulated percentage
        return {
          ...initialGameState,
          percentageEarned: prevState.percentageEarned,
        };
      }
      
      return {
        ...initialGameState,
        currentLevel: nextLevel,
        percentageEarned: prevState.percentageEarned,
      };
    });
    setIsLevelComplete(false);
  }, []);
  
  return (
    <GameContext.Provider value={{
      gameState,
      movePlayer,
      attack,
      updateGame,
      isGameOver,
      isLevelComplete,
      restartLevel,
      goToNextLevel,
      resetGame,
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the context
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameContextProvider');
  }
  return context;
};