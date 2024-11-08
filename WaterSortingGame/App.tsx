import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameOptionsScreen from './screens/GameOptionsScreen';
import GameScreen from './screens/GameScreen';
import { SelectionEnum } from './assets/Enums';

export type RootStackParamList = {
  GameOptions: undefined;
  GameScreen: { selectedOption: SelectionEnum };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GameOptions">
        <Stack.Screen
          name="GameOptions"
          component={GameOptionsScreen}
          options={{ title: 'Water Sorting Game' }}
        />
        <Stack.Screen
          name="GameScreen"
          component={GameScreen}
          options={{ title: 'Play Game' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
