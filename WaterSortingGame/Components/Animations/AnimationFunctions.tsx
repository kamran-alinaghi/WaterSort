import { Animated } from "react-native"

export const TimingAnime = (val: Animated.ValueXY | Animated.Value, X: number, Y: number | null = null, duration:number | null = null) => {
    let result: Animated.CompositeAnimation;
    if (Y) {
        result = Animated.timing(val, {
            toValue: new Animated.ValueXY({ x: X, y: Y }),
            duration:duration?duration:500,
            useNativeDriver: false
        })
    }
    else {
        result = Animated.timing(val, {
            toValue: new Animated.Value(X),
            duration:duration?duration:500,
            useNativeDriver: false
        })
    }
    return result;
}