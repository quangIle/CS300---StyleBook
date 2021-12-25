import React, { useState, useRef, useEffect } from "react"
import {
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  View,
  Text,
  StatusBar,
} from "react-native"
import Form from "../../components/form"
import { useDispatch, useSelector } from "react-redux"
import { setAccountInformation } from "../../redux/actions"
//Icon
import UsernameIcon from "../../assets/icons/user-avatar.svg"
import PasswordIcon from "../../assets/icons/fingerprint-simple-thin.svg"
import EmailIcon from "../../assets/icons/envelope-simple-open-thin.svg"
import FullnameIcon from "../../assets/icons/identification-card-thin.svg"

import { useNavigation } from "@react-navigation/native"

export default function Authentication(props) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const GoToHomeScreen = () => {
    navigation.replace("Main")
  }
  const [authState, setAuthState] = useState(0)
  const user = useSelector((state) => state.user)
  const loginForm = useRef([
    {
      key: 5,
      icon: UsernameIcon,
      text: "Username",
      value: "",
    },
    {
      key: 6,
      icon: PasswordIcon,
      secureTextEntry: true,
      text: "Password",
      value: "",
    },
  ])
  const onUserLogin = () => {
    // pull loginForm.current's "value" to username & password
    const [{ value: username }, { value: password }] = loginForm.current
    if (username === "User" && password === "123") {
      dispatch(setAccountInformation({ username, password }))
      GoToHomeScreen()
    }
  }
  const registerForm = useRef([
    {
      key: 1,
      icon: EmailIcon,
      text: "Email",
      value: "",
    },
    {
      key: 2,
      icon: FullnameIcon,
      text: "Name",
      value: "",
    },
    {
      key: 3,
      icon: UsernameIcon,
      text: "Username",
      value: "",
    },
    {
      key: 4,
      icon: PasswordIcon,
      secureTextEntry: true,
      text: "Password",
      value: "",
    },
  ])
  const AuthScreen = () => {
    switch (authState) {
      case 0: //Main state
        return (
          <>
            <Image
              source={require("../../assets/logo-icons/logo.png")}
              style={styles.logoContainer}
            />
            <>
              <Form
                form={loginForm.current}
                buttonText={"Login"}
                onCommit={onUserLogin}
              />
              <View>
                <Text
                  style={{
                    color: "black",
                    fontFamily: "SF Pro Display Regular",
                    fontSize: 16,
                    marginTop: "5%",
                  }}>
                  {"Don't have an account? "}
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "SF Pro Display Semibold",
                      fontSize: 18,
                    }}
                    onPress={() => {
                      setAuthState(1)
                    }}>
                    {"Sign up"}
                  </Text>
                </Text>
              </View>
            </>
          </>
        )
      case 1:
        return (
          <>
            <Form
              form={registerForm.current}
              buttonText={"Register"}
              onCommit={() => {}}
            />
            <View>
              <Text
                style={{
                  color: "black",
                  fontFamily: "SF Pro Display Regular",
                  fontSize: 16,
                  marginTop: "5%",
                }}>
                {"Already have an account? "}
                <Text
                  style={{
                    color: "black",
                    fontFamily: "SF Pro Display Semibold",
                    fontSize: 18,
                  }}
                  onPress={() => {
                    setAuthState(0)
                  }}>
                  {"Sign in"}
                </Text>
              </Text>
            </View>
          </>
        )
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor="#ffffff" />
      {AuthScreen()}
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  otherMethod: {
    alignItems: "center",
  },
  logoContainer: {
    height: "30%",
    width: "60%",
    resizeMode: "contain",
  },
  facebookLoginButton: {
    marginVertical: 10,
    width: "80%",
  },
  divider: {
    width: "40%",
    marginTop: 10,
  },
})
