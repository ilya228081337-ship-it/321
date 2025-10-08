import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  level: number;
}

export default function LevelBackground({ level }: Props) {
  const getBackgroundColors = () => {
    switch (level) {
      case 1:
        return ['#2d5016', '#1a3009'];
      case 2:
        return ['#4a5568', '#2d3748'];
      case 3:
        return ['#742a2a', '#4a1414'];
      default:
        return ['#2d5016', '#1a3009'];
    }
  };

  return (
    <View style={styles.background}>
      <LinearGradient
        colors={getBackgroundColors()}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.pattern}>
          {Array.from({ length: 20 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.patternLine,
                { top: i * 40 }
              ]}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  pattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.1,
  },
  patternLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#fff',
  },
});
