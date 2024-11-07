import { SelectionEnum } from "../assets/Enums";
import Bottle from "./Bottle";
import { BottleProperties, BottleType, Point } from "./Types";
import { Alert, Animated } from "react-native";

const MAX_BOTTLE_CAPACITY = 4;
let QtyRow1 = 0; //difficulty > 2 ? 7 : 4;
let QtyRow2 = 0; //difficulty > 0 ? (difficulty < 2 ? 2 : (difficulty < 3 ? 4 : 7)) : 2;

export const handleBottlePress = (index: number, selectedBottle: number) => {
    let result=-1;
    if (selectedBottle < 0) {
        result= index;
    } else if (selectedBottle == index) {
        result= -1;
    } else {
        //pourWater(selectedBottle, index, bottles, setBottles);
        result= -1;
    }
    //Alert.alert("i: " + index.toString() + " - s: " + selectedBottle.toString() + " - r: "+result);
    return result;
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

export const resetGame = (setSelectedBottle: Function, selection: SelectionEnum, selectedBottle:number) => {
    SetRows(selection)
    let diff = 0;
    switch (selection) {
        case SelectionEnum.Medium:
            diff = 8;
            break;
        case SelectionEnum.Hard:
            diff = 14;
            break;
        default:
            diff = 6;
            break;
    }
    let myBottles = GetInitialBottles(selection);
    //setBottles(myBottles);
    setSelectedBottle(selectedBottle);
};

export const GetInitialBottles = (selection: SelectionEnum) => {
    let BottleColors:BottleType[]=[
        [0,7,11,2],
        [4,10,1,8],
        [5,9,6,3],
        [0,0,0,0],
        [3,3,3,3],[],[],[],[],[],[],[],[],[]
    ];
    let diff = 0;
    switch (selection) {
        case SelectionEnum.Medium:
            diff = 8;
            break;
        case SelectionEnum.Hard:
            diff = 14;
            break;
        default:
            diff = 6;
            break;
    }
    let BottleArray: Bottle[] = [];
      for (let i = 0; i < diff; i++) {
        const param: BottleProperties = {
          selectedBottle: -1,
          layers: BottleColors[i],
          bottleId: i,
          difficulty: selection
        }
        BottleArray.push(new Bottle(param));
      }
      return BottleArray;
}

function SetRows(difficulty: SelectionEnum) {
    QtyRow1 = difficulty > 1 ? 7 : 4;
    QtyRow2 = difficulty < 1 ? 2 : (difficulty < 2 ? 4 : 7);
    //console.log(isNaN( difficulty));
}

export const GetPos = (index: number, screenWidth: number, difficulty: SelectionEnum, bottleWidth:number, gap:number, screenHeight:number) => {
    SetRows(difficulty);
    let result: Point;
    result = { X: 0, Y: 0 };
    const side1 = (screenWidth - ((bottleWidth + gap) * QtyRow1)) / 2;
    const side2 = (screenWidth - ((bottleWidth + gap) * QtyRow2)) / 2;

    if (index < QtyRow1) {
        result = { X: side1 + index * (bottleWidth + gap), Y: screenHeight*0.15 };
    }
    else {
        result = { X: side2 + (index - QtyRow1) * (bottleWidth + gap), Y: screenHeight*0.5 };
    }

    return result;
}

export const FillComplete = (colorArray: number[] | null) => {
    if (colorArray != null) {
        if (colorArray.length > 3) {
            for (let i = 1; i < colorArray.length; i++) {
                if (colorArray[i] != colorArray[0]) { return false; }
            }
            return true;
        }
        else { return false; }
    }
    else { return false; }
}