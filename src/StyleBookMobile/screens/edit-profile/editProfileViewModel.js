import { useState, useEffect, useRef } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import * as ImagePicker from "expo-image-picker"
import {
  uploadAvatarAsync,
  updateUserInformationAsync,
} from "../../utils/server"
import {
  setAccountInformation,
  setModalLoadingVisible,
  displayModalMessage,
} from "../../redux/actions"

const useEditProfileViewModel = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()
  const UPLOAD_PICTURE = "Upload picture"

  const user = useSelector((state) => state.user)
  const [avatarUri, setAvatarUri] = useState(user.avatar)
  const [userInputsText, setUserInputsText] = useState({
    name: user.name,
    email: user.email,
    username: user.username,
    gender: user.gender,
    age: user.age.toString(),
    height: user.height.toString(),
  })
  const userInputs = useRef([
    {
      key: "name",
      title: "Name",
      autoCaptital: "words",
    },
    {
      key: "email",
      title: "Email",
      keyboardType: "email-address",
      editable: false,
    },
    {
      key: "username",
      title: "Username",
    },
    {
      key: "gender",
      title: "Gender",
    },
    {
      key: "age",
      title: "Age",
      keyboardType: "number-pad",
    },
    {
      key: "height",
      title: "Height(cm)",
      keyboardType: "number-pad",
    },
  ])
  const handleInputs = (title) => (text) =>
    setUserInputsText((prevState) => ({ ...prevState, [title]: text }))
  // handle change avatar
  const [modalSetting, setModalSetting] = useState()
  useEffect(() => {
    if (!route.params?.result) return

    switch (route.params?.actionType) {
      case UPLOAD_PICTURE:
        // uploadPicture(route.params.result)
        setAvatarUri(route.params.result)
        route.params.result = undefined
        route.params.actionType = undefined
        break
      default:
        break
    }
  }, [route.params?.result])

  const TakePicture = () => {
    setModalSetting(null)
    navigation.navigate("Camera", {
      screen: route.name,
      actionType: UPLOAD_PICTURE,
    })
  }
  const ChoosePicture = async () => {
    setModalSetting(null)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })

    if (!result.cancelled) setAvatarUri(result.uri)
  }
  const changePicture = {
    title: "Profile picture",
    actions: [
      {
        title: "Take a picture",
        onPress: TakePicture,
        colorIndex: 0,
      },
      {
        title: "Choose from gallery",
        onPress: ChoosePicture,
        colorIndex: 1,
      },
    ],
  }
  // end handle change avatar
  const onBackPress = async () => {
    navigation.goBack()
  }
  const updateUser = () => {
    dispatch(setModalLoadingVisible(true))
    updateUserInformationAsync(userInputsText, (response, type) => {
      dispatch(setModalLoadingVisible(false))
      if (type === "success") {
        if (response.status === 1) {
          dispatch(
            setAccountInformation({
              user: { ...response.data },
            })
          )
          dispatch(displayModalMessage(response.message))
        } else dispatch(displayModalMessage(response.message))
      } else dispatch(displayModalMessage(response.message))
    })
  }

  const checkInput = () => {
    const regex = /\d*\s*/
    if (userInputsText.age.match(regex)[0].length !== userInputsText.age.length)
      dispatch(displayModalMessage("Incorrect AGE format!"))
    else if (
      userInputsText.height.match(regex)[0].length !==
      userInputsText.height.length
    )
      dispatch(displayModalMessage("Incorrect HEIGHT format!"))
    else return true
    return false
  }
  const onDonePress = () => {
    if (!checkInput()) return
    dispatch(setModalLoadingVisible(true))
    if (avatarUri !== user.avatar)
      uploadAvatarAsync(avatarUri, (response, type) => {
        dispatch(setModalLoadingVisible(false))
        if (type === "success") {
          if (response.status === 1) {
            updateUser()
          } else dispatch(displayModalMessage(response.message))
        } else dispatch(displayModalMessage(response.message))
      })
    else updateUser()
  }
  const onChangeAvatar = () => {
    setModalSetting(changePicture)
  }
  const onGenderPress = () => {
    setModalSetting(changeGender)
  }
  const onChangePassword = () => {
    navigation.navigate("Change password")
  }
  const mapGenderToString = (gender) => {
    switch (gender) {
      case "U":
        return "Unisex"
      case "F":
        return "Female"
      case "M":
        return "Male"
      default:
        return "N/A"
    }
  }
  const setGender = (gender) => () => {
    setUserInputsText((prevState) => ({ ...prevState, gender: gender }))
    setModalSetting(null)
  }
  const changeGender = {
    title: "Select your gender",
    actions: [
      {
        title: "Unisex",
        onPress: setGender("U"),
      },
      {
        title: "Male",
        onPress: setGender("M"),
      },
      {
        title: "Female",
        onPress: setGender("F"),
      },
    ],
  }
  return {
    onBackPress,
    onDonePress,
    user,
    onChangeAvatar,
    modalSetting,
    setModalSetting,
    handleInputs,
    userInputs: userInputs.current,
    userInputsText,
    mapGenderToString,
    onGenderPress,
    onChangePassword,
    avatarUri,
  }
}
export default useEditProfileViewModel
