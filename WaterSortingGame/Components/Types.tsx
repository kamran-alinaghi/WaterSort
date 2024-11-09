import { Animated } from "react-native";
import { SelectionEnum } from "../assets/Enums";

export type BottleType = number[];
export type BottleProperties={
    layers:number[],
    bottleId:number,
    difficulty:SelectionEnum,
    selectedBottle:number,
    key:number
}
export type Point={
    X:number,
    Y:number
}

export type AnimateToPoint={
    X:Animated.Value,
    Y:Animated.Value
}