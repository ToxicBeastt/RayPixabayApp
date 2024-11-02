import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import { useFonts } from 'expo-font'
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import 'react-native-reanimated';
import "../global.css";

import {Stack} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useEffect(() => {
    if(error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null


  return (
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Provider>
  );
}
