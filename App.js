import { useCallback } from 'react';

import { View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native'; // routing
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeView from './views/HomeView';
import QuestionsView from './views/QuestionView';
import ScoreView from './views/ScoreView';

import 'react-native-reanimated';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Pelita': require('./assets/fonts/Pelita.ttf'),
    'Pelita-Bold': require('./assets/fonts/Pelita-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    
    <View style={{ position: 'absolute', width: '100%', height: '100%' }} onLayout={onLayoutRootView}>
      <NavigationContainer >
          <Stack.Navigator 
            initialRouteName='Home'
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name='Score' component={ScoreView} ></Stack.Screen>
            <Stack.Screen name='Questions' component={QuestionsView} ></Stack.Screen>
            <Stack.Screen name='Home' component={HomeView} ></Stack.Screen>
            
          </Stack.Navigator>
        
      </NavigationContainer>
      </View>
    
  );
}
