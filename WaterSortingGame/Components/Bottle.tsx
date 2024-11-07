import React, { Component, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { BottleProperties, AnimateToPoint } from './Types';
import { FillComplete } from './GameLogic';
import { State } from 'react-native-gesture-handler';
import { measure, useAnimatedRef } from 'react-native-reanimated';
import { GetPos } from './GameLogic';

// Define color mappings based on index
const COLORS = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'];
const windowWidth = Dimensions.get('window').width;

class Bottle extends React.Component<BottleProperties> {
    otherSelectedButton:number=-1;
    IsSelected: boolean = false;
    _id=this.props.bottleId;
    FirstPos = GetPos(this.props.bottleId, windowWidth, this.props.difficulty);
    Pos:Animated.ValueXY=new Animated.ValueXY({x:this.FirstPos.X,y:this.FirstPos.Y})
    PosX = new Animated.Value(this.FirstPos.X);
    PosY = new Animated.Value(this.FirstPos.Y);
    MoveUp = () => {
        let toVal = 0;
        if (this.IsSelected) { toVal = this.FirstPos.Y - 50;}
        else { toVal = this.FirstPos.Y; }
        Animated.timing(this.Pos, {
            toValue:new Animated.ValueXY({
                x: this.FirstPos.X,
                y: toVal
            }),
            useNativeDriver: false
        }).start();
    }

    PourWater=(nextBottleId:number)=>{
        let result=true;
        Alert.alert("from: " + this._id.toString() + " to: " + nextBottleId.toString());
        return result;
    }

    SetSelectedBottle=(index:number)=>{

    }

    render(): React.ReactNode {
        return (
            <Animated.View style={{ position: 'absolute', left:this.Pos.x, top:this.Pos.y}}>
                <TouchableOpacity onPress={() => {
                    this.SetSelectedBottle(this.props.bottleId);
                    //this.MoveUp();
                }}
                    style={[styles.bottle]}>
                    {this.props.layers.map((colorIndex, index) => (
                        <View
                            key={index}
                            style={[
                                styles.waterLayer,
                                {
                                    backgroundColor: COLORS[colorIndex],
                                    //opacity: animations[index], // Apply animation effect
                                },
                            ]}
                        />
                    ))}
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

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

export default Bottle;
