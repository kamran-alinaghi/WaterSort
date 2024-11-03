import { StyleSheet } from 'react-native';

export const ButtonStyles = StyleSheet.create({
  optionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width:250,
  },
  continueButton:{
    backgroundColor:'#009eff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 40,
    width:250,
  }
});

export const BackgroundStyles = StyleSheet.create({
  main:{
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '#000000',
  } 
});

export const TextStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'white',
    marginBottom: 20,
  },
  optionButtons:{
    color: '#fff',
    fontSize: 18,
    textAlign:'center',
  }
});