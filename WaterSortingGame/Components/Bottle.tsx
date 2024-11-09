import React, { Component, useEffect, useLayoutEffect, useRef, useState, EffectCallback } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { BottleProperties, AnimateToPoint } from './Types';
import { FillComplete } from './GameLogic';
import { State } from 'react-native-gesture-handler';
import { measure, useAnimatedRef } from 'react-native-reanimated';
import { GetPos } from './GameLogic';
import { COLORS } from './GeneralValues';
import { GetAnimationList } from './Animations/AnimationArray';

// Define color mappings based on index

const windowWidth = Dimensions.get('window').width;
const windowHeight=Dimensions.get('window').height;
const bottleWidth = windowWidth * 0.1;
const gap = windowWidth * 0.035;
const time=5000;

class Bottle extends React.Component<BottleProperties> {
    
    Angle=new Animated.Value(0);
    Height=new Animated.Value(bottleWidth);
    Bottom=new Animated.Value(20);
    Top=new Animated.Value(0);
    
    otherSelectedButton:number=-1;
    IsSelected: boolean = false;
    FirstPos = GetPos(this.props.bottleId, windowWidth, this.props.difficulty, bottleWidth, gap, windowHeight);
    Pos:Animated.ValueXY=new Animated.ValueXY({x:this.FirstPos.X,y:this.FirstPos.Y})
    Move = (nextBottleId: number, idList: number[]) => {
        let selectedAnimations: Animated.CompositeAnimation[] = [];
        const animationList: Animated.CompositeAnimation[] = GetAnimationList(this, nextBottleId);
        for (let i = 0; i < idList.length; i++) { selectedAnimations.push(animationList[idList[i]]); }

        Animated.sequence(selectedAnimations).start(()=>{
            // for (let i = 0; i < idList.length; i++){
            //     if(idList[i]==4){
            //         this.props.layers.pop();
            //     }
            // }
        });
    }

    SetSelectedBottle = (index: number) => { }

    render(): React.ReactNode {
        return (
            <Animated.View key={this.props.bottleId} style={[{
                position: 'absolute', left: this.Pos.x, top: this.Pos.y,
                transform: [{
                    rotate: this.Angle.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg']
                    })
                }]
            }]}>
                <TouchableOpacity key={this.props.bottleId} onPress={() => {
                    this.SetSelectedBottle(this.props.bottleId);
                }}
                    style={[styles.bottle]}>
                    <Animated.View key={this.props.bottleId} style={[
                        {
                            position:'relative',
                            left: this.Bottom,
                            top:20 + (4 - this.props.layers.length)*bottleWidth
                        }
                    ]}>
                        {this.props.layers.map((colorIndex, index, array) => (
                            <Animated.View
                                key={index}
                                style={[
                                    styles.waterLayer,
                                    {
                                        top:index==0? this.Top:0,
                                        backgroundColor: COLORS[colorIndex],
                                        transform: [
                                            {
                                                rotate: this.Angle.interpolate({
                                                    inputRange: [0, 360],
                                                    outputRange: ['0deg', '-360deg']
                                                })
                                            },
                                        ]
                                    },
                                ]}
                            />
                        ))}
                    </Animated.View>
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
        overflow: 'hidden',
        backgroundColor: 'black',
    },
    waterLayer: {
        height: bottleWidth, // Adjust height to fit 4 layers in the bottle
        width:bottleWidth*10,
        position:'relative',
        left:-bottleWidth*5
    },
});

export default Bottle;
