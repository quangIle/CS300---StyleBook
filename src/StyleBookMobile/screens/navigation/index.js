import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack"

import Main from "../main"
import IntroductionScreen from "../introduction"
import CameraCapture from "../camera"
import BarcodeScanner from "../barcode-scanner"

import Authentication from "../authentication"
import CreatePost from "../create-post"
import Profile from "../profile"
import EditProfile from "../edit-profile"
import ChangePassword from "../change-password"
import ModalNotification from "../../components/modal-notification"

import { useSelector } from "react-redux"

const Stack = createStackNavigator()

const NavigationScreen = () => {
  const [isUserValid, setIsUserValid] = useState(null)
  const user = useSelector((state) => state.user)
  const checkUser = () => {
    if (user.username === "User" && user.password === "123")
      setIsUserValid(true)
  }
  useEffect(() => {
    checkUser()
  }, [])
  return (
    <>
      {isUserValid != null && (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isUserValid ? "Main" : "Authentication"}
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Authentication" component={Authentication} />
            <Stack.Screen name="Introduction" component={IntroductionScreen} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                gestureEnabled: true,
                gestureDirection: "vertical",
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              }}
            />
            <Stack.Screen name="Camera" component={CameraCapture} />
            <Stack.Screen name="Create post" component={CreatePost} />
            <Stack.Screen name="Barcode scan" component={BarcodeScanner} />
            <Stack.Screen
              name="Edit profile"
              component={EditProfile}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
            <Stack.Screen
              name="Change password"
              component={ChangePassword}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
      <ModalNotification />
    </>
  )
}
export default NavigationScreen
