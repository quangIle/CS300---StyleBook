import React, { useState, useEffect } from "react"
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from "react-native"

import * as ImagePicker from "expo-image-picker"
import ProfileHeader from "../../components/header-profile"
import ModalSetting from "../../components/modal-setting"
import { useDispatch, useSelector } from "react-redux"
import { setAccountInformation, displayModalMessage } from "../../redux/actions"
import {
  useRoute,
  useNavigation,
  CommonActions,
} from "@react-navigation/native"
import Feed from "../../components/feed"
import Avatar from "../../components/avatar"
import Header from "../../components/header"
// secure store
import { deleteItemAsync } from "expo-secure-store"
import { uploadAvatarAsync } from "../../utils/server"

const { width, height } = Dimensions.get("window")
const AVATAR_PERCENTAGE = 0.3

const Profile = () => {
  const [modalSetting, setModalSetting] = useState(null)
  const dispatch = useDispatch()

  const navigation = useNavigation()

  const route = useRoute()
  const [onLogOut, setOnLogOut] = useState(false)
  let otherUser = null
  if (route.params && route.params.user) otherUser = route.params.user
  const userInfo = useSelector((state) => state.user)

  const user = otherUser ? otherUser : userInfo
  const UPLOAD_PICTURE = "Upload picture"
  useEffect(() => {
    if (!route.params?.result) return

    switch (route.params?.actionType) {
      case UPLOAD_PICTURE:
        uploadPicture(route.params.result)
        route.params.result = undefined
        route.params.actionType = undefined
        break
      default:
        break
    }
  }, [route.params?.result])
  const logOut = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Authentication" }],
      })
    )
  }
  const editProfile = () => {
    setModalSetting(null)
    navigation.navigate("Edit profile")
  }
  const setting = {
    title: "Settings",
    actions: [
      {
        title: "Edit profile",
        onPress: editProfile,
        colorIndex: 1,
      },
      {
        title: "Logout",
        onPress: logOut,
        colorIndex: 4,
      },
    ],
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
      <StatusBar barStyle={"dark-content"} backgroundColor="#ffffff" />
      <ModalSetting setting={modalSetting} setModalSetting={setModalSetting} />
      <View style={styles.main}>
        {otherUser ? (
          <Header
            onBackPress={otherUser ? () => navigation.goBack() : null}
            title={otherUser.name}
          />
        ) : (
          <ProfileHeader onSettingPress={() => setModalSetting(setting)} />
        )}
        <View style={styles.container}>
          <Feed
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: "5%",
                  paddingHorizontal: 10,
                }}>
                <Avatar length={width * AVATAR_PERCENTAGE} uri={user.avatar} />
                <View
                  style={{
                    justifyContent: "center",
                    marginHorizontal: "5%",
                  }}>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.username}>{user.username}</Text>
                  {user.gender && (
                    <Text style={styles.info}>
                      {user.age},{" "}
                      {user.gender === "M"
                        ? "Male"
                        : user.gender === "F"
                        ? "Female"
                        : "Unisex"}
                      , {user.height} cm
                    </Text>
                  )}
                </View>
              </View>
            }
            style={styles.feed}
            user={user._id}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  feed: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
  },
  name: {
    fontFamily: "SF Pro Display Bold",
    fontSize: 30,
  },
  username: {
    fontFamily: "SF Pro Display Regular",
    fontSize: 18,
  },
  info: {
    fontFamily: "SF Pro Display Regular",
    fontSize: 18,
    marginBottom: "5%",
    color: "#808080",
  },
})

export default Profile
