import React, { Component, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { BottleProperties, AnimateToPoint } from './Types';
import { FillComplete } from './GameLogic';
import { State } from 'react-native-gesture-handler';
import { measure, useAnimatedRef } from 'react-native-reanimated';
import { GetPos } from './GameLogic';
import { COLORS } from './GeneralValues';

// Define color mappings based on index

const windowWidth = Dimensions.get('window').width;
const bottleWidth = windowWidth * 0.1;
const gap = windowWidth * 0.035;

class Bottle extends React.Component<BottleProperties> {
    otherSelectedButton:number=-1;
    IsSelected: boolean = false;
    _id=this.props.bottleId;
    FirstPos = GetPos(this.props.bottleId, windowWidth, this.props.difficulty, bottleWidth, gap, Dimensions.get('window').height);
    Pos:Animated.ValueXY=new Animated.ValueXY({x:this.FirstPos.X,y:this.FirstPos.Y})
    PosX = new Animated.Value(this.FirstPos.X);
    PosY = new Animated.Value(this.FirstPos.Y);
    MoveUp = () => {
        let toVal = 0;
        if (this.IsSelected) { toVal = this.FirstPos.Y - 30;}
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
        width: bottleWidth,
        height: bottleWidth*4.5,
        borderWidth: 2,
        borderColor: '#afafaf',
        borderBottomRightRadius: bottleWidth*0.4,
        borderBottomLeftRadius: bottleWidth*0.4,
        margin: 10,
        justifyContent: 'flex-end',
        overflow: 'hidden',
        backgroundColor: 'black',
    },
    waterLayer: {
        height: bottleWidth, // Adjust height to fit 4 layers in the bottle
    },
});

export default Bottle;
