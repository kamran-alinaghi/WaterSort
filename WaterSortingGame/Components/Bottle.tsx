import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

// Define color mappings based on index
const COLORS = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'];

type BottleProps = {
  layers: number[]; // Array of integers representing color indices
};

const Bottle: React.FC<BottleProps> = ({ layers }) => {
  // Animated values for each layer
  const animations = useRef(layers.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Trigger the animation when layers change
    animations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  }, [layers]);

  return (
    <View style={styles.bottle}>
      {layers.map((colorIndex, index) => (
        <Animated.View
          key={index}
          style={[
            styles.waterLayer,
            {
              backgroundColor: COLORS[colorIndex],
              opacity: animations[index], // Apply animation effect
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottle: {
    width: 60,
    height: 200,
    borderWidth: 2,
    borderColor: '#afafaf',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    margin: 10,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  waterLayer: {
    height: 40, // Adjust height to fit 4 layers in the bottle
  },
});

export default Bottle;
