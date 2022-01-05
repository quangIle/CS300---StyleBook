import React from "react"
import { StyleSheet, Dimensions } from "react-native"
import SwipeImage from "../swipe-image"

//Animated import
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window")
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  Easing,
  runOnUI,
  runOnJS,
} from "react-native-reanimated"
import { PanGestureHandler } from "react-native-gesture-handler"

const SWIPE_UP_HEIGHT = HEIGHT / 6
const MAX_ROTATE_WIDTH = WIDTH / 2
const SWIPE_WIDTH = WIDTH / 4

const SwipableCard = (props) => {
  const { style, onSwipe, onSwipeUp, switchKey, item, spot } = props

  const x = useSharedValue(0)
  const y = useSharedValue(0)
  const angle = useDerivedValue(() => {
    return (x.value / MAX_ROTATE_WIDTH) * 15
  })
  const resetCardPosition = () => {
    y.value = 0
  }
  const cardMovingStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { rotateZ: `${angle.value}deg` },
      ],
      zIndex: switchKey.value,
    }
  })

  const likeAnimation = useAnimatedStyle(() => {
    return {
      opacity: angle.value / 15,
    }
  })
  const nopeAnimation = useAnimatedStyle(() => {
    return {
      opacity: angle.value < 0 ? (angle.value * angle.value) / (15 * 15) : 0,
    }
  })
  const cardEventHandler = useAnimatedGestureHandler({
    onActive: (e, ctx) => {
      if (switchKey.value < 0 || item == null) return //This card is background or have no item
      y.value = e.translationY
      const ratio =
        -y.value / SWIPE_UP_HEIGHT > 1 ? 0 : 1 - -y.value / SWIPE_UP_HEIGHT
      x.value = e.translationX * ratio
    },
    onEnd: (e, ctx) => {
      if (switchKey.value < 0 || item == null) return //This card is background or have no item
      if (-y.value > SWIPE_UP_HEIGHT) {
        //Swipe up
        runOnJS(onSwipeUp)(resetCardPosition)
        x.value = 0
        y.value = withTiming(
          -HEIGHT,
          {
            duration: 500,
            easing: Easing.inOut(Easing.exp),
          }
          // ,
          // () => {
          //   y.value = 0
          // }
        )
        return
      }
      //Cant use abs function
      if (x.value > -SWIPE_WIDTH && x.value < SWIPE_WIDTH) {
        //Return the card
        x.value = withTiming(0, {
          duration: 500,
          easing: Easing.inOut(Easing.exp),
        })
        y.value = withTiming(0, {
          duration: 500,
          easing: Easing.inOut(Easing.exp),
        })
      } else {
        const isLike = x.value > 0
        //Move the card out side
        x.value = withTiming(
          Math.sign(x.value) * WIDTH * 2,
          {
            duration: 400,
            easing: Easing.inOut(Easing.exp),
          },
          (finish) => {
            //Set the card layer to go under
            switchKey.value = -spot
            //Dummy code, wait for sometimes and then teleport the card
            y.value = withTiming(
              0,
              {
                duration: 100,
                easing: Easing.inOut(Easing.exp),
              },
              (finish) => {
                x.value = 0
                y.value = 0
                runOnJS(onSwipe)(isLike, item)
              }
            )
          }
        )
      }
    },
  })
  return (
    <PanGestureHandler onGestureEvent={cardEventHandler}>
      <Animated.View style={[styles.cardContainer, cardMovingStyle, style]}>
        <SwipeImage
          item={item}
          likeAnimation={likeAnimation}
          nopeAnimation={nopeAnimation}
        />
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default SwipableCard
