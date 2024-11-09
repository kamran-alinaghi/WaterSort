import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import Bottle from '../Components/Bottle';
import { BottleType } from '../Components/Types';
import { handleBottlePress, resetGame, GetInitialBottles } from '../Components/GameLogic';
import { BackgroundStyles } from '../Styles/Styles';
import AnimatedBottle from '../Components/AnimatedBottle';
import { BottleProperties } from '../Components/Types';
import { SelectionEnum } from '../assets/Enums';

type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;
type Props = {
  route: GameScreenRouteProp;
};
let QtyRow1 = 0;
let QtyRow2 = 0;

const GameScreen: React.FC<Props> = ({ route }) => {
  const [selectedBottle, setSelectedBottle] = useState<number>(-3);
  const { selectedOption: selection } = route.params;
  const [BottleArray, setBottleArray] = useState<Bottle[]>([]);



  useEffect(() => {
    let myBottles = GetInitialBottles(selection);
    setBottleArray(myBottles);
  }, []);

  return (
    <View style={BackgroundStyles.main}>
      {BottleArray.map((value, index, array) => {
        value.SetSelectedBottle = setSelectedBottle;
        if (selectedBottle == index) {
          if (value.otherSelectedButton > -1) {
            if (value.otherSelectedButton == selectedBottle) {
              value.IsSelected = false;
              value.Move(index, [0]);
              setSelectedBottle(-1);
            }
            else {
              const isDone = false;
              array[value.otherSelectedButton].Move(index, [1, 3, 4, 2]);
              setSelectedBottle(-1);
            }
          }
          else {
            value.IsSelected = true;
            value.Move(index, [0]);
          }
        }
        value.otherSelectedButton = selectedBottle;

        //value.MoveUp();
        return value.render();
      })}

      <TouchableOpacity style={styles.resetButton} onPress={() => setBottleArray(GetInitialBottles(selection))}>
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
    color: 'white'
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
