import React, { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Vibration,
  Platform,
} from "react-native"
import { Camera } from "expo-camera"
import AndroidCamera from "../../components/custom-android-camera"
import ImageReview from "../../components/image-review"
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import * as ImagePicker from "expo-image-picker"
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator"
//Icon
import CameraIcon from "../../assets/icons/camera-fill.svg"
import ReverseIcon from "../../assets/icons/arrow-clockwise.svg"
import GalleryIcon from "../../assets/icons/image-square-fill.svg"
import TimerOn from "../../assets/icons/timer-on.svg"
import TimerOff from "../../assets/icons/timer-off.svg"

export default function CameraCapture() {
  const timer1 = 15
  const timer2 = 5

  const isFocused = useIsFocused()
  const route = useRoute()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const [hasPermission, setHasPermission] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [captures, setCaptures] = useState(null)
  // --Begin timer handle
  const activeTimer = useRef(timer1)
  let COUNT_DOWN = activeTimer.current + 1
  const setActiveTimer = (value) => {
    activeTimer.current = value
    COUNT_DOWN = activeTimer.current + 1
    setCountDown(COUNT_DOWN)
  }
  const [countDown, setCountDown] = useState(COUNT_DOWN)
  const [isTimerOn, setIsTimerOn] = useState(false)
  const getStyle = (value) =>
    value === activeTimer.current ? styles.aciveText : styles.inaciveText
  const toggleTimer = () => {
    Vibration.vibrate()
    setIsTimerOn(!isTimerOn)
  }
  const timeoutFunc = useRef()
  useEffect(() => {
    if (!isTimerOn) setCountDown(COUNT_DOWN)
  }, [isTimerOn])
  useEffect(() => {
    if (countDown < 0) {
      snapPicture()
      return
    }
    if (countDown < COUNT_DOWN) {
      const timeoutFunc = setTimeout(() => setCountDown(countDown - 1), 1000)
      return () => clearTimeout(timeoutFunc)
    }
  }, [countDown])
  // --END timer handle

  const camera = useRef()
  const snapPicture = async () => {
    if (isTimerOn && countDown === COUNT_DOWN) setCountDown(COUNT_DOWN - 1)
    else if (camera.current) {
      setCountDown(COUNT_DOWN)
      let photo = await camera.current.takePictureAsync({
        quality: 1,
      })
      if (cameraType == Camera.Constants.Type.front) {
        //Flip the image horizontal
        photo = await manipulateAsync(
          photo.uri,
          [{ flip: FlipType.Horizontal }],
          { compress: 1, format: SaveFormat.JPEG }
        )
      } else {
        //The image will rotate 90 degrees CCW
        photo = await manipulateAsync(photo.uri, [{ rotate: 360 }], {
          compress: 1,
          format: SaveFormat.JPEG,
        })
      }
      setCaptures(photo.uri)
    }
  }

  const choosePicture = async () => {
    setCaptures(null)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })

    if (!result.cancelled) setCaptures(result.uri)
  }

  const reverseCam = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    )
  }

  const acceptImage = async () => {
    navigation.navigate(route.params.screen, {
      actionType: route.params.actionType,
      result: captures,
    })
  }

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
      if (status !== "granted") navigation.goBack()
    })()
  }, [])
  const render = useRef(0)
  if (!hasPermission) return <View />

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor="transparent" />
      {isFocused && (
        <>
          {captures ? (
            <ImageReview
              uri={captures}
              declineImage={() => setCaptures(null)}
              acceptImage={acceptImage}
            />
          ) : (
            <View style={{ flex: 1 }}>
              <View style={[styles.timerContainer, { paddingTop: insets.top }]}>
                <TouchableOpacity
                  style={[styles.timerIconContainer, { flex: 1 }]}
                  onPress={toggleTimer}>
                  {isTimerOn ? (
                    <TimerOn height="75%" aspectRatio={0.7} />
                  ) : (
                    <TimerOff height="75%" aspectRatio={0.7} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.timerTextContainer}
                  onPress={() => setActiveTimer(timer1)}>
                  {isTimerOn && (
                    <Text
                      style={getStyle(timer1)}>{`${timer1}s`}</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.timerTextContainer}
                  onPress={() => setActiveTimer(timer2)}>
                  {isTimerOn && (
                    <Text
                      style={getStyle(timer2)}>{`${timer2}s`}</Text>
                  )}
                </TouchableOpacity>
              </View>
              {Platform.OS === "android" ? (
                <AndroidCamera
                  style={styles.camera}
                  type={cameraType}
                  cameraRef={camera}>
                  <View style={styles.countDownContainer}>
                    <Text style={styles.countDownText}>
                      {countDown < COUNT_DOWN && countDown > -1 && countDown}
                    </Text>
                  </View>
                </AndroidCamera>
              ) : (
                <Camera style={styles.camera} type={cameraType} ref={camera}>
                  <View style={styles.countDownContainer}>
                    <Text style={styles.countDownText}>
                      {countDown < COUNT_DOWN && countDown > -1 && countDown}
                    </Text>
                  </View>
                </Camera>
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity //Search galery
                  style={styles.timerIconContainer}
                  onPress={choosePicture}>
                  <GalleryIcon height="100%" aspectRatio={0.4} />
                </TouchableOpacity>
                <TouchableOpacity //Take picture
                  style={styles.timerIconContainer}
                  onPress={snapPicture}>
                  <CameraIcon height="100%" aspectRatio={0.7} />
                </TouchableOpacity>
                <TouchableOpacity //Reverse cam
                  style={styles.timerIconContainer}
                  onPress={reverseCam}>
                  <ReverseIcon height="100%" aspectRatio={0.4} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    paddingBottom: "5%",
    height: "15%",
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timerContainer: {
    height: "10%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  countDownContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  aciveText: {
    fontSize: 20,
    color: "#f1c40f",
    textAlign: "center",
    fontFamily: "SF Pro Display Semibold",
  },
  inaciveText: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    fontFamily: "SF Pro Display Semibold",
  },
  countDownText: {
    fontSize: 200,
    opacity: 0.5,
    color: "white",
  },
  timerTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  timerIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
