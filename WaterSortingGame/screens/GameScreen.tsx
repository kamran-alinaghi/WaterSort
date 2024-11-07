import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import Bottle from '../Components/Bottle';
import { BottleType } from '../Components/Types';
import { handleBottlePress, resetGame } from '../Components/GameLogic';
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
  // Destructure `selectedOption` as `selection` from `route.params`
  const [selectedBottle, setSelectedBottle] = useState<number>(-3);
  const { selectedOption: selection } = route.params;
  const [BottleArray,setBottleArray] = useState<Bottle[]>([]);
  


  useEffect(() => {
    SetRows(selection)
    let diff = 0;
    switch (selection) {
        case SelectionEnum.Medium:
            diff = 8;
            break;
        case SelectionEnum.Hard:
            diff = 14;
            break;
        default:
            diff = 6;
            break;
    }
    
    let myBottles = GetInitialBottles();
    setBottleArray(myBottles);

    function SetRows(difficulty: SelectionEnum) {
      QtyRow1 = difficulty > 1 ? 7 : 4;
      QtyRow2 = difficulty < 1 ? 2 : (difficulty < 2 ? 4 : 7);
    }

    function GetInitialBottles() {
      let BottleArray2: Bottle[] = [];
      for (let i = 0; i < diff; i++) {
        const param: BottleProperties = {
          selectedBottle: selectedBottle,
          layers: [0, 1, 2, 3],
          bottleId: i,
          difficulty: selection
        }
        BottleArray2.push(new Bottle(param));
      }
      return BottleArray2;
    }
  }, []);

  return (
    <View style={BackgroundStyles.main}>
      <Text style={styles.title}>Selected Option: {selection.toString()}</Text>

        {BottleArray.map((value, index, array)=>{
          value.SetSelectedBottle = setSelectedBottle;
          //value.otherSelectedButton=selectedBottle;
          if (selectedBottle == index) {
            //Alert.alert(value.otherSelectedButton.toString());
            if (value.otherSelectedButton > -1) {
              if (value.otherSelectedButton == selectedBottle) {
                value.IsSelected = false;
                value.MoveUp();
                setSelectedBottle(-1);
              }
              else {
                const isDone= array[value.otherSelectedButton].PourWater(index);
                if (isDone) {
                  array[value.otherSelectedButton].IsSelected = false;
                  array[value.otherSelectedButton].MoveUp();
                  setSelectedBottle(-1);
                }
              }
            }
            else {
              //setSelectedBottle(index);
              value.IsSelected = true;
              value.MoveUp();
            }
          }
          value.otherSelectedButton = selectedBottle;
          
          //value.MoveUp();
          return value.render();
        })}

      <TouchableOpacity style={styles.resetButton} onPress={() => resetGame(setSelectedBottle, selection, selectedBottle)}>
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
