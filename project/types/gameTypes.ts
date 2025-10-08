// Player type
export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
  direction: 'left' | 'right';
  isAttacking: boolean;
  weapon: string;
  cooldown: number;
}

// Enemy type
export interface Enemy {
  id: string;
  type: 'regular' | 'impatient' | 'karen';
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
  maxHealth: number;
  speed: number;
}

// Level configuration
export interface Level {
  name: string;
  maxEnemies: number;
  spawnRate: number;
  enemyTypes: ('regular' | 'impatient' | 'karen')[];
  background: string;
  maxProgress: number;
}

// Weapon configuration
export interface Weapon {
  name: string;
  damage: number;
  range: number;
  cooldown: number;
}

// Game state
export interface GameState {
  player: Player;
  enemies: Enemy[];
  score: number;
  currentLevel: number;
  levelProgress: number;
  levelMaxProgress: number;
  gameTime: number;
  percentageEarned: number;
}