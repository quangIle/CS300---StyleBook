import { useNavigation } from "@react-navigation/native"
import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Avatar from "../avatar"

const AuthorInfo = ({ showAvatar, likeCount, author }) => {
  const navigation = useNavigation()
  const GoToUserProfile = () => {
    navigation.navigate("Profile", { user: author })
  }
  return (
    <TouchableOpacity style={styles.authorContainer} onPress={GoToUserProfile}>
      {showAvatar && <Avatar uri={author.avatar} length={34} />}
      <View
        style={[
          styles.authorInfoContainer,
          { marginLeft: showAvatar ? "4%" : 0 },
        ]}>
        <Text style={styles.titleText}>‣ {author.username}</Text>
        {likeCount >= 0 && (
          <Text style={styles.likeText}>
            {likeCount}
            {" like" + (likeCount > 1 ? "s" : "")}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}
export default AuthorInfo

const styles = StyleSheet.create({
  likeText: {
    fontSize: 15,
    fontFamily: "SF Pro Display Bold",
  },
  titleText: {
    fontSize: 15,
    color: "#9f47de",
    fontFamily: "SF Pro Display Bold",
  },
  authorContainer: {
    flexDirection: "row",
  },
  authorInfoContainer: {
    flexDirection: "column",
  },
})
