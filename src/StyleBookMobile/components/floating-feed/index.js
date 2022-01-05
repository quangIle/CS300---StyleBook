import React, { useRef, useState } from "react"
import { Text, View, StyleSheet, Dimensions } from "react-native"

//Icons
import ImageCard from "../image-card"
import AuthorInfo from "../author-info"

const { width, height } = Dimensions.get("window")
const FloatingFeed = (props) => {
  const { item, openDetailPost } = props

  const randomHeight = useRef(Math.random() * height * 0.2 + height * 0.3)
  const trimStringForCard = (text) => {
    const maximumCharacter = 50
    return (
      text.substring(0, maximumCharacter) +
      (text.length > maximumCharacter ? "..." : "")
    )
  }
  const { img, author, content } = item
  const showAvatar = true
  return (
    <View style={styles.feed}>
      <View style={styles.post}>
        <ImageCard
          height={randomHeight.current}
          source={{ uri: img }}
          shadow
          onLongPress={openDetailPost}></ImageCard>
        <View style={styles.feedText}>
          <AuthorInfo
            author={author}
            likeCount={Math.round(Math.random() * 100)}
            showAvatar
          />
          <Text style={styles.contentText}>{trimStringForCard(content)}</Text>
        </View>
      </View>
    </View>
  )
}
export default FloatingFeed

const styles = StyleSheet.create({
  feed: {
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  post: {
    margin: 5,
    justifyContent: "flex-start",
    flexDirection: "column",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    flex: 1,
  },
  feedText: {
    margin: 5,
    flexDirection: "column",
    flex: 1,
  },
  contentText: {
    marginTop: 4,
    marginBottom: "5%",
    fontFamily: "SF Pro Display Regular",
    fontSize: 15,
  },
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})
