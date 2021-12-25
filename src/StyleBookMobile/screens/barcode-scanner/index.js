import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, Button, Alert, Vibration } from "react-native"
import { Camera } from "expo-camera"
import { useNavigation } from "@react-navigation/native"
import LottieView from "lottie-react-native"
const BarcodeScanner = () => {
  const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
      if (status !== "granted") navigation.goBack()
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    Vibration.vibrate()

    navigation.navigate({ name: "Home", params: { qrData: data } })
  }

  if (!hasPermission) return <View />

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camera}
        type={Camera.Constants.Type.back}>
        <View style={styles.scannerContainer}>
          <LottieView
            source={require("../../assets/animations/scanning/lottie-scan.json")}
            autoPlay
            loop
            resizeMode="cover"
          />
        </View>
      </Camera>
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
    alignItems: "center",
    justifyContent: "center",
  },
  scannerContainer: {
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  scanner: {
    backgroundColor: "red",
    height: "50%",
  },
})

export default BarcodeScanner
