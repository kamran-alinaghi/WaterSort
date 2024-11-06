import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { BottleProperties } from './Types';
import { FillComplete } from './GameLogic';
import { State } from 'react-native-gesture-handler';
import { measure } from 'react-native-reanimated';

// Define color mappings based on index
const COLORS = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'];
const windowWidth = Dimensions.get('window').width;

const AnimatedBottle: React.FC<BottleProperties> = ({ bottleId, layers, onTouch, difficulty}) => {
    let Id = bottleId;
    const QtyRow1 = difficulty > 2 ? 7 : 4;
    const QtyRow2 = difficulty > 0 ? (difficulty < 2 ? 2 : (difficulty < 3 ? 4 : 7)) : 2;
    const [xPosition, SetX] = useState<number>(0);
    const [yPosition, SetY] = useState<number>(0);
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

    const MoveUp = () => {
        //measure()
    }
    return (
        <TouchableOpacity onPress={() => {
            //Alert.alert(QtyEachRow.toString());
            MoveUp();
            onTouch(Id);
            if(FillComplete(layers)){Alert.alert("Complete!");}
        }
        }>
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
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  bottle: {
    width: 40,
    height: 150,
    borderWidth: 2,
    borderColor: '#afafaf',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    margin: 10,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  waterLayer: {
    height: 35, // Adjust height to fit 4 layers in the bottle
  },
});

export default AnimatedBottle;
