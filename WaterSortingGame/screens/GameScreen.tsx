import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { BackgroundStyles, TextStyles } from '../Styles/Styles';

type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;

type Props = {
  route: GameScreenRouteProp;
};

const GameScreen: React.FC<Props> = ({ route }) => {
  const { selectedOption: selection } = route.params;

  return (
    <View style={BackgroundStyles.main}>
      <Text style={TextStyles.title}>Selected: {selection}</Text>
      <Text style={TextStyles.title}>Game content goes here...</Text>
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
