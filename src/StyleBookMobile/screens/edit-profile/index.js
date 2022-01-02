import React from "react"
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  ScrollView,
  SafeAreaView,
  Keyboard,
} from "react-native"
import useEditProfileViewModel from "./editProfileViewModel"
import Avatar from "../../components/avatar"
import SimpleButton from "../../components/simple-button"
import ModalSetting from "../../components/modal-setting"
import Header from "../../components/header"
import { TouchableOpacity } from "react-native-gesture-handler"

const { width, height } = Dimensions.get("window")
const AVATAR_PERCENTAGE = 0.3

const EditProfile = () => {
  const {
    onBackPress,
    onDonePress,
    user,
    onChangeAvatar,
    modalSetting,
    setModalSetting,
    handleInputs,
    userInputs,
    userInputsText,
    mapGenderToString,
    onGenderPress,
    onChangePassword,
    avatarUri,
  } = useEditProfileViewModel()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor="#ffffff" />
      <ModalSetting setting={modalSetting} setModalSetting={setModalSetting} />
      <Header
        title={"Edit Profile"}
        backText={"Back"}
        confirmText={"Done"}
        onBackPress={onBackPress}
        onDonePress={onDonePress}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <ScrollView
          style={styles.infoContainer}
          showsVerticalScrollIndicator={false}>
          <Avatar
            length={width * AVATAR_PERCENTAGE}
            uri={avatarUri}
            style={{ alignSelf: "center", marginBottom: "5%" }}
            onPress={onChangeAvatar}
          />
          <View style={styles.inputsContainer}>
            {userInputs.map((input, index) => (
              <View style={styles.infoInputContainer} key={input.key}>
                <Text style={styles.inputTitle}>{input.title}</Text>
                {input.key === "gender" ? (
                  <View style={styles.genderText}>
                    <TouchableOpacity
                      onPress={onGenderPress}
                      style={styles.genderTouchable}>
                      <Text>{mapGenderToString(userInputsText.gender)}</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TextInput
                    style={{
                      flex: 1,
                      borderColor: "#dfe4ea",
                      borderBottomWidth: index != userInputs.length - 1 ? 1 : 0,
                      height: "100%",
                    }}
                    value={userInputsText[input.key]}
                    onChangeText={handleInputs(input.key)}
                    keyboardType={input.keyboardType || "default"}
                    autoCapitalize={input.autoCaptital || "none"}
                    editable={input.editable !== false}
                  />
                )}
              </View>
            ))}
          </View>
          <SimpleButton
            noBorder
            style={{ flex: 1, height: 50, paddingHorizontal: 10 }}
            fontStyle={{ color: "#fc5c65" }}
            onPress={onChangePassword}
            text={"Change password"}
            color={"#95A5A6"}
          />
          <SimpleButton
            noBorder
            style={{ flex: 1, height: 50, paddingHorizontal: 10 }}
            fontStyle={{ color: "#fc5c65" }}
            onPress={onChangeAvatar}
            text={"Change avatar"}
            color={"#95A5A6"}
          />
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
  header: {
    width: "100%",
    paddingTop: 7,
    paddingHorizontal: 5,
    paddingStart: 7,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    flex: 8,
    fontFamily: "SF Pro Display Bold",
    fontSize: 22,
    textAlign: "center",
  },
  headerDoneButton: {
    fontFamily: "SF Pro Display Regular",
    fontSize: 17,
    textAlign: "center",
    color: "green",
  },
  headerFlex: {
    flex: 2,
  },
  changeAvatar: {
    fontFamily: "SF Pro Display Bold",
    fontSize: 15,
    color: "#5579C6",
    marginTop: 10,
  },
  infoInputContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "5%",
  },
  inputContent: {
    fontFamily: "SF Pro Display Regular",
  },
  inputTitle: {
    width: width * 0.3,
    fontFamily: "SF Pro Display Semibold",
    textAlignVertical: "center",
    fontSize: 15,
  },
  infoContainer: {
    flex: 1,
    paddingVertical: "5%",
  },
  changePassword: {
    fontFamily: "SF Pro Display Bold",
    fontSize: 15,
    color: "#5579C6",
    marginTop: 10,
  },
  genderText: {
    flex: 1,
    height: "100%",
    borderBottomWidth: 1,
    borderColor: "#dfe4ea",
    justifyContent: "center",
  },
  inputsContainer: {
    borderColor: "#dfe4ea",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  genderTouchable: {
    height: "100%",
    justifyContent: "center",
  },
})
export default EditProfile
