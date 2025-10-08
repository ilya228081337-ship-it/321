import { View, StyleSheet } from 'react-native';
import { useGameContext } from '@/context/GameContext';

export default function Enemies() {
  const { gameState } = useGameContext();
  const { enemies } = gameState;

  return (
    <View style={styles.container}>
      {enemies.map(enemy => (
        <View
          key={enemy.id}
          style={[
            styles.enemy,
            {
              left: enemy.x,
              top: enemy.y,
              width: enemy.width,
              height: enemy.height,
            },
          ]}
        >
          <View style={styles.enemySprite}>
            {enemy.type === 'karen' ? (
              <>
                <View style={[styles.enemyHead, styles.karenHead]} />
                <View style={[styles.enemyBody, styles.karenBody]} />
              </>
            ) : enemy.type === 'impatient' ? (
              <>
                <View style={[styles.enemyHead, styles.impatientHead]} />
                <View style={[styles.enemyBody, styles.impatientBody]} />
              </>
            ) : (
              <>
                <View style={styles.enemyHead} />
                <View style={styles.enemyBody} />
              </>
            )}
          </View>

          <View style={styles.healthBarContainer}>
            <View
              style={[
                styles.healthBar,
                { width: `${(enemy.health / enemy.maxHealth) * 100}%` }
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  enemy: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enemySprite: {
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enemyHead: {
    width: 25,
    height: 25,
    backgroundColor: '#ff9999',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#333',
    position: 'absolute',
    top: 5,
  },
  enemyBody: {
    width: 30,
    height: 35,
    backgroundColor: '#888',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#333',
    position: 'absolute',
    top: 25,
  },
  karenHead: {
    backgroundColor: '#ff6666',
    width: 28,
    height: 28,
  },
  karenBody: {
    backgroundColor: '#990000',
    width: 35,
    height: 40,
  },
  impatientHead: {
    backgroundColor: '#ffcc66',
  },
  impatientBody: {
    backgroundColor: '#ff9933',
  },
  healthBarContainer: {
    position: 'absolute',
    bottom: -8,
    width: '80%',
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
  },
  healthBar: {
    height: '100%',
    backgroundColor: '#e74c3c',
    borderRadius: 2,
  },
});
