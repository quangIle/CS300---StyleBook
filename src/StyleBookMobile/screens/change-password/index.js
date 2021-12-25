import React from "react"
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  SafeAreaView,
} from "react-native"
import useChangePasswordViewModel from "./changePasswordViewModel"
import BackIcon from "../../assets/icons/arrow_navigate_back.svg"
import OpenEye from "../../assets/icons/open_eye.svg"
import CloseEye from "../../assets/icons/close_eye.svg"
import ShadowButton from "../../components/shadow-button"
import Header from "../../components/header"

const ChangePassword = () => {
  const {
    onBackPress,
    userInputs,
    userInputsText,
    handleTextInput,
    toggleSecureEntry,
    onConfirmPress,
  } = useChangePasswordViewModel()
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor="#ffffff" />
      <Header
        onBackPress={onBackPress}
        onDonePress={onConfirmPress}
        title={"Change password"}
        backText={"Back"}
        confirmText={"Done"}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <ScrollView
          style={{
            paddingVertical: "10%",
          }}>
          {userInputs.map((input) => (
            <View style={styles.inputContainer} key={input.key}>
              <Text style={styles.inputTitle}>{input.title}</Text>
              <View style={styles.iconContainer}>
                <TextInput
                  style={styles.inputText}
                  placeholder={input.placeholder}
                  secureTextEntry={userInputsText[input.key].secure}
                  value={userInputsText[input.key].text}
                  onChangeText={handleTextInput(input.key)}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={toggleSecureEntry(input.key)}>
                  {userInputsText[input.key].secure ? (
                    <CloseEye height={24} width={24} />
                  ) : (
                    <OpenEye height={24} width={24} />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={styles.description}>{input.description}</Text>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    flex: 8,
    fontFamily: "SF Pro Display Bold",
    fontSize: 26,
    margin: 10,
    marginBottom: "20%",
    paddingStart: 10,
    textAlign: "left",
  },
  backContainer: {
    width: "100%",
    padding: 7,
  },
  inputTitle: {
    fontFamily: "SF Pro Display Semibold",
    fontSize: 15,
    width: "85%",
    marginBottom: 3,
    color: "grey",
  },
  inputText: {
    flex: 1,
    fontSize: 13,
    paddingEnd: 10,
    paddingVertical: 10,
  },
  inputContainer: {
    alignItems: "center",
  },
  iconContainer: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 15,
  },
  description: {
    width: "80%",
    fontFamily: "SF Pro Display Regular",
    fontSize: 12,
    color: "grey",
    textAlign: "left",
    marginBottom: 15,
  },
})
export default ChangePassword
