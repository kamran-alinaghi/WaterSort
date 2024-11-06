import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { BackgroundStyles, ButtonStyles, TextStyles } from '../Styles/Styles';
import { SelectionEnum } from '../assets/Enums';

type GameOptionsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameOptions'
>;

type Props = {
  navigation: GameOptionsScreenNavigationProp;
};

const GameOptionsScreen: React.FC<Props> = ({ navigation }) => {
  const handleStartGame = (selection: SelectionEnum) => {
    navigation.navigate('GameScreen', { selectedOption: selection });
  };
  
  return (
    <View style={BackgroundStyles.mainMenu}>
      {/* <TouchableOpacity style={[ButtonStyles.continueButton]} onPress={() => handleStartGame(SelectionEnum.Continue)}>
        <Text style={[TextStyles.optionButtons, { fontSize: 26 }]}>Continue</Text>
      </TouchableOpacity>

      <Text style={TextStyles.title}>Or New Game</Text> */}


      <TouchableOpacity style={ButtonStyles.optionButton} onPress={() => handleStartGame(SelectionEnum.Easy)}>
        <Text style={TextStyles.optionButtons}>Easy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ButtonStyles.optionButton} onPress={() => handleStartGame(SelectionEnum.Medium)}>
        <Text style={TextStyles.optionButtons}>Medium</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ButtonStyles.optionButton} onPress={() => handleStartGame(SelectionEnum.Hard)}>
        <Text style={TextStyles.optionButtons}>Hard</Text>
      </TouchableOpacity>
    </View>
  );
};


export default GameOptionsScreen;
