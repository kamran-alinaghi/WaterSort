import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import Bottle from '../Components/Bottle';
import { BottleType } from '../Components/Types';
import { handleBottlePress, resetGame } from '../Components/GameLogic';
import { BackgroundStyles } from '../Styles/Styles';

type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;
type Props = {
  route: GameScreenRouteProp;
};

const GameScreen: React.FC<Props> = ({ route }) => {
  // Destructure `selectedOption` as `selection` from `route.params`
  const { selectedOption: selection } = route.params;

  // Initial state for bottles
  const [bottles, setBottles] = useState<BottleType[]>([
    [0, 0, 1, 1],
    [2, 2, 3, 3],
    [1, 0, 3, 2],
    [],
    []
  ]);

  const [selectedBottle, setSelectedBottle] = useState<number | null>(null);


  return (
    <View style={BackgroundStyles.main}>
      <Text style={styles.title}>Selected Option: {selection}</Text>

      <View style={styles.bottlesContainer}>
        {bottles.map((layers, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleBottlePress(index, selectedBottle, setSelectedBottle, bottles, setBottles)}
          >
            <Bottle layers={layers} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={() => resetGame(setBottles, setSelectedBottle)}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottlesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#FF5733',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default GameScreen;
