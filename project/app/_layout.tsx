import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import {
  PressStart2P_400Regular
} from '@expo-google-fonts/press-start-2p';
import {
  VT323_400Regular
} from '@expo-google-fonts/vt323';
import * as SplashScreen from 'expo-splash-screen';
import { GameContextProvider } from '@/context/GameContext';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded] = useFonts({
    'PressStart2P': PressStart2P_400Regular,
    'VT323': VT323_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GameContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="game" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </GameContextProvider>
  );
}