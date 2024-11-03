import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type GameOptionsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameOptions'
>;

type Props = {
  navigation: GameOptionsScreenNavigationProp;
};

const GameOptionsScreen: React.FC<Props> = ({ navigation }) => {
  const handleStartGame = (difficulty: string) => {
    navigation.navigate('GameScreen', { difficulty });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Difficulty</Text>

      <TouchableOpacity style={styles.optionButton} onPress={() => handleStartGame('easy')}>
        <Text style={styles.optionText}>Easy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => handleStartGame('medium')}>
        <Text style={styles.optionText}>Medium</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => handleStartGame('hard')}>
        <Text style={styles.optionText}>Hard</Text>
      </TouchableOpacity>
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
  optionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default GameOptionsScreen;
