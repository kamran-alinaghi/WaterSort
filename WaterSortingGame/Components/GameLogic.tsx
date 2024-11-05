import { BottleType } from "./Types";

const MAX_BOTTLE_CAPACITY = 4;

export const handleBottlePress = (index: number, selectedBottle: number | null, setSelectedBottle: Function, bottles: BottleType[], setBottles: Function) => {
    if (selectedBottle === null) {
        setSelectedBottle(index);
    } else if (selectedBottle === index) {
        setSelectedBottle(null);
    } else {
        pourWater(selectedBottle, index, bottles, setBottles);
        setSelectedBottle(null);
    }
};

export const pourWater = (from: number, to: number, bottles: BottleType[], setBottles: Function) => {
    const fromBottle = [...bottles[from]];
    const toBottle = [...bottles[to]];

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

export const resetGame = (setBottles: Function, setSelectedBottle: Function) => {
    setBottles([
        [0, 0, 1, 1],
        [2, 2, 3, 3],
        [1, 0, 3, 2],
        [0, 0],
        []
    ]);
    setSelectedBottle(null);
};