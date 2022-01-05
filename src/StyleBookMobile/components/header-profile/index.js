import React from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"

import CloseIcon from "../../assets/icons/x-close.svg"
import SettingIcon from "../../assets/icons/list.svg"

const ProfileHeader = ({ onSettingPress, onBackPress }) => {
  return (
    <View>
      {onBackPress && (
        <View style={styles.container}>
          <View />
          <TouchableOpacity onPress={onBackPress}>
            <CloseIcon width={32} height={32} />
          </TouchableOpacity>
        </View>
      )}
      {onSettingPress && (
        <View style={styles.container}>
          <Text style={styles.header}>Profile</Text>
          <TouchableOpacity onPress={onSettingPress}>
            <SettingIcon width={32} height={32} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 46,
    marginTop: 6,
    paddingLeft: 20,
    paddingRight: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "flex-end",
    zIndex: 0,
  },
  header: {
    fontFamily: "SF Pro Display Heavy",
    fontSize: 30,
  },
})

export default ProfileHeader
