import { Animated } from "react-native";
import { SelectionEnum } from "../assets/Enums";

export type BottleType = number[];
export type BottleProperties={
    layers:number[],
    bottleId:number,
    onTouch:Function,
    screenSize:number | null,
    difficulty:SelectionEnum
}
export type Point={
    X:number,
    Y:number
}