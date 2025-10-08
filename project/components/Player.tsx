import { View, StyleSheet } from 'react-native';
import { useGameContext } from '@/context/GameContext';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function Player() {
  const { gameState } = useGameContext();
  const { player } = gameState;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scaleX: player.direction === 'left' ? -1 : 1 },
        {
          scale: player.isAttacking
            ? withTiming(1.1, { duration: 100 })
            : withTiming(1, { duration: 100 })
        }
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          left: player.x,
          top: player.y,
          width: player.width,
          height: player.height,
        },
        animatedStyle
      ]}
    >
      <View style={styles.playerSprite}>
        <View style={styles.head} />
        <View style={styles.body} />
        <View style={styles.arm} />
      </View>

      {player.isAttacking && (
        <View
          style={[
            styles.attackIndicator,
            { left: player.direction === 'right' ? player.width : -40 }
          ]}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerSprite: {
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    width: 30,
    height: 30,
    backgroundColor: '#ffcc99',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#333',
    position: 'absolute',
    top: 10,
  },
  body: {
    width: 35,
    height: 40,
    backgroundColor: '#4169e1',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#333',
    position: 'absolute',
    top: 35,
  },
  arm: {
    width: 20,
    height: 30,
    backgroundColor: '#ffcc99',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#333',
    position: 'absolute',
    top: 40,
    right: 5,
  },
  attackIndicator: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: '#ff3e78',
    opacity: 0.7,
    borderRadius: 20,
  },
});
