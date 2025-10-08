import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameContext } from '@/context/GameContext';

export default function HomeScreen() {
  const router = useRouter();
  const { resetGame } = useGameContext();
  
  const startGame = () => {
    resetGame();
    router.push('/game');
  };

  return (
    <LinearGradient 
      colors={['#4c0f35', '#2d0b1f']} 
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>YAPOSHA</Text>
        <Text style={styles.subtitle}>CUSTOMER CRISIS</Text>
        
        <View style={styles.characterContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/8850335/pexels-photo-8850335.jpeg' }}
            style={styles.characterImage}
            resizeMode="contain"
          />
          <Text style={styles.characterName}>Ira Prokhorenkova</Text>
          <Text style={styles.characterDesc}>Shop Assistant at Yaposha</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={startGame}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>START GAME</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.buttonSecondary]}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>HOW TO PLAY</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.footer}>
          Survive the retail apocalypse and earn your percentage!
        </Text>
      </View>
    </LinearGradient>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontFamily: 'PressStart2P',
    fontSize: 32,
    color: '#ff3e78',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontFamily: 'PressStart2P',
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  characterContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  characterImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#ff3e78',
    marginBottom: 10,
  },
  characterName: {
    fontFamily: 'VT323',
    fontSize: 24,
    color: '#fff',
    marginBottom: 5,
  },
  characterDesc: {
    fontFamily: 'VT323',
    fontSize: 18,
    color: '#ccc',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ff3e78',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ff94b8',
  },
  buttonSecondary: {
    backgroundColor: '#4a246b',
    borderColor: '#7e42b5',
  },
  buttonText: {
    fontFamily: 'PressStart2P',
    fontSize: 14,
    color: '#fff',
  },
  footer: {
    fontFamily: 'VT323',
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
  },
});