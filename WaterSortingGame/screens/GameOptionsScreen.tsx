import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { BackgroundStyles, ButtonStyles, TextStyles } from '../Styles/Styles';

type GameOptionsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameOptions'
>;

type Props = {
  navigation: GameOptionsScreenNavigationProp;
};

const GameOptionsScreen: React.FC<Props> = ({ navigation }) => {
  const handleStartGame = (selection: string) => {
    navigation.navigate('GameScreen', { selectedOption: selection });
  };

  return (
    <View style={BackgroundStyles.main}>

    <TouchableOpacity style={[ButtonStyles.continueButton]} onPress={() => handleStartGame('Continue')}>
      <Text style={[TextStyles.optionButtons , {fontSize:26}]}>Continue</Text>
    </TouchableOpacity>

      <Text style={TextStyles.title}>Or New Game</Text>


      <TouchableOpacity style={ButtonStyles.optionButton} onPress={() => handleStartGame('Easy')}>
        <Text style={TextStyles.optionButtons}>Easy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ButtonStyles.optionButton} onPress={() => handleStartGame('Medium')}>
        <Text style={TextStyles.optionButtons}>Medium</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ButtonStyles.optionButton} onPress={() => handleStartGame('Hard')}>
        <Text style={TextStyles.optionButtons}>Hard</Text>
      </TouchableOpacity>
    </View>
  );
};


export default GameOptionsScreen;
