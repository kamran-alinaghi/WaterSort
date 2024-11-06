import { SelectionEnum } from "../assets/Enums";
import { BottleType, Point } from "./Types";
import { Animated } from "react-native";

const MAX_BOTTLE_CAPACITY = 4;
let QtyRow1 = 0; //difficulty > 2 ? 7 : 4;
let QtyRow2 = 0; //difficulty > 0 ? (difficulty < 2 ? 2 : (difficulty < 3 ? 4 : 7)) : 2;

export const handleBottlePress = (index: number, selectedBottle: number | null, bottles: BottleType[], setBottles: Function) => {
    if (selectedBottle === null) {
        return index;
    } else if (selectedBottle === index) {
        return null;
    } else {
        pourWater(selectedBottle, index, bottles, setBottles);
        return null;
    }
};

export const pourWater = (from: number, to: number, bottles: BottleType[], setBottles: Function) => {
    const fromBottle = bottles[from];
    const toBottle = bottles[to];

    if (fromBottle.length === 0) return;

    const colorToPour = fromBottle[fromBottle.length - 1];

    if (
        (toBottle.length < MAX_BOTTLE_CAPACITY) &&
        (toBottle.length === 0 || toBottle[toBottle.length - 1] === colorToPour)
    ) {
        fromBottle.pop();
        toBottle.push(colorToPour);

        const newBottles = [...bottles];
        newBottles[from] = fromBottle;
        newBottles[to] = toBottle;
        setBottles(newBottles);

        checkWinCondition(newBottles);
    }
};

export const checkWinCondition = (bottles: BottleType[]) => {
    const isWin = bottles.every(
        (bottle) => bottle.length === 0 || (bottle.length === MAX_BOTTLE_CAPACITY && new Set(bottle).size === 1)
    );

    if (isWin) {
        //Alert.alert("Congratulations!", "You sorted all the bottles!", [{ text: "Play Again", onPress: resetGame }]);
    }
};

export const resetGame = (setBottles: Function, setSelectedBottle: Function, selection:SelectionEnum) => {
    SetRows(selection)
    let myBottles: BottleType[];
    myBottles = [];
    let diff = 0;
    switch (selection) {
        case SelectionEnum.Medium:
            diff = 6;
            break;
        case SelectionEnum.Hard:
            diff = 12;
            break;
        default:
            diff = 4;
            break;
    }
    for (let i = 0; i < diff; i++) {
        myBottles.push([0, 1, 2, 3]);
    }
    myBottles.push([], []);
    setBottles(myBottles);
    setSelectedBottle(null);
};

function SetRows(difficulty:SelectionEnum){
    QtyRow1 = difficulty > 1 ? 7 : 4;
    QtyRow2 = difficulty < 1 ? 2 : (difficulty < 2 ? 4 : 7);
    //console.log(isNaN( difficulty));
}

export const GetPos=(index:number, screenWidth:number,difficulty:SelectionEnum)=>{
    SetRows(difficulty);
    let result: Point;
    const tempWidth = 40;
    result = { X: 0, Y: 0 };
    const gap = 15;
    const side1 = (screenWidth - ((tempWidth + gap) * QtyRow1)) / 2;
    const side2 = (screenWidth - ((tempWidth + gap) * QtyRow2)) / 2;

    if (index < QtyRow1) {
        result = { X: side1 + index * (tempWidth + gap), Y: 200 };
    }
    else {
        result = { X: side2 + (index - QtyRow1) * (tempWidth + gap), Y: 500 };
    }

    return result;
}

export const FillComplete = (colorArray:number[] | null)=>{
    if(colorArray!=null){
        if(colorArray.length>3){
            for(let i=1;i<colorArray.length;i++){
                if(colorArray[i]!=colorArray[0]){return false;}
            }
            return true;
        }
        else{return false;}
    }
    else { return false; }
}