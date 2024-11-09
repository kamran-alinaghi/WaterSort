import { Animated, Dimensions } from "react-native";
import Bottle from "../Bottle";
import { GetPos } from "../GameLogic";
import { TimingAnime } from "./AnimationFunctions";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const bottleWidth = windowWidth * 0.1;
const gap = windowWidth * 0.035;
const time = 5000;

export const GetAnimationList = (obj: Bottle, nextBottleId: number) => {
    let toVal = 0;
    if (obj.IsSelected) { toVal = obj.FirstPos.Y - 30; }
    else { toVal = obj.FirstPos.Y; }
    const newPos = GetPos(nextBottleId, windowWidth, obj.props.difficulty, bottleWidth, gap, windowHeight);
    newPos.X -= 70;
    newPos.Y -= 50;

    let definedAngle=0;
    switch (obj.props.layers.length) {
        case 4: definedAngle = 63; break;
        default: definedAngle = 90; break;
    }



    const animationList: Animated.CompositeAnimation[] = [
        // 0 Lift up
        TimingAnime(obj.Pos, obj.FirstPos.X, toVal),
        // 1 go to the next bottle
        TimingAnime(obj.Pos, newPos.X, newPos.Y),
        // 2 come back to the first position
        Animated.parallel([
            TimingAnime(obj.Pos, obj.FirstPos.X, obj.FirstPos.Y),
            TimingAnime(obj.Angle, 0),
            TimingAnime(obj.Bottom, 20)
        ]),
        // 3 Angle
        TimingAnime(obj.Angle, 40),
        // 4 next bottle and turn
        Animated.parallel([
            TimingAnime(obj.Pos, newPos.X - 20, newPos.Y - 35, time),
            TimingAnime(obj.Angle, definedAngle, null, time),
            TimingAnime(obj.Top, bottleWidth, null, time),
            TimingAnime(obj.Bottom, 58 - bottleWidth, null, time)
        ])
    ];
    return animationList;
}