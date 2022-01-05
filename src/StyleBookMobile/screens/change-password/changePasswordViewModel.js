import { useNavigation } from "@react-navigation/native"
import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setModalLoadingVisible,
  displayModalMessage,
  setAccountInformation,
} from "../../redux/actions"
import { updateUserInformationAsync } from "../../utils/server"

const useChangePasswordViewModel = () => {
  const navigation = useNavigation()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [userInputsText, setUserInputsText] = useState({
    oldPass: { text: "", secure: true },
    newPass: { text: "", secure: true },
    renewPass: { text: "", secure: true },
  })
  const userInputs = useRef([
    {
      key: "oldPass",
      title: "Old Password",
      placeholder: "Old password",
      description: "", //TODO: fill here
    },
    {
      key: "newPass",
      title: "New Password",
      placeholder: "New password",
      description: "Password must have at least 8 character.",
    },
    {
      key: "renewPass",
      title: "Re-enter New Password",
      placeholder: "Confirm password",
      description: "This must match your new password.",
    },
  ])
  const onBackPress = () => {
    navigation.goBack()
  }
  const handleTextInput = (key) => (text) =>
    setUserInputsText((prev) => ({
      ...prev,
      [key]: {
        text,
        secure: prev[key].secure,
      },
    }))
  const toggleSecureEntry = (key) => () =>
    setUserInputsText((prev) => ({
      ...prev,
      [key]: {
        text: prev[key].text,
        secure: !prev[key].secure,
      },
    }))
  const checkPassword = () => {
    const { oldPass, newPass, renewPass } = userInputsText
    if (newPass.text.length < 8)
      dispatch(displayModalMessage("Password must have at least 8 character!"))
    else if (newPass.text !== renewPass.text)
      dispatch(
        displayModalMessage(
          "The password and confirmation password do not match!"
        )
      )
    else if (oldPass.text === user.password) {
      user.password = newPass.text
      return false
    } else
      dispatch(
        displayModalMessage("Old password does not match current password.")
      )
    return true
  }
  const onConfirmPress = () => {
    if (checkPassword()) return

    dispatch(setModalLoadingVisible(true))
    updateUserInformationAsync(user, (response, type) => {
      dispatch(setModalLoadingVisible(false))
      if (type === "success") {
        if (response.status === 0) {
          dispatch(setAccountInformation(response.data))
          userInputsText.oldPass.text = ""
          userInputsText.newPass.text = ""
          userInputsText.renewPass.text = ""
          dispatch(
            displayModalMessage(response.message, () => navigation.goBack())
          )
        } else dispatch(displayModalMessage(response.message))
      } else dispatch(displayModalMessage(response.message))
    })
  }
  return {
    onBackPress,
    userInputsText,
    userInputs: userInputs.current,
    handleTextInput,
    toggleSecureEntry,
    onConfirmPress,
  }
}
export default useChangePasswordViewModel
