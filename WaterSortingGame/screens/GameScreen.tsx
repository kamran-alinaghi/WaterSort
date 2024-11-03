import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;

type Props = {
  route: GameScreenRouteProp;
};

const GameScreen: React.FC<Props> = ({ route }) => {
  const { difficulty } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Difficulty: {difficulty}</Text>
      <Text>Game content goes here...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default GameScreen;
