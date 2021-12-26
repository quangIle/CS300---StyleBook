import { Image, TouchableOpacity, StyleSheet, View } from "react-native"
import React from "react"
import FastImage from "../fast-image"

const ImageWrapper = ({ url, length }) => {
  return (
    <FastImage
      source={{ uri: url }}
      style={{
        resizeMode: "cover",
        borderRadius: 200,
        borderWidth: 1,
        overflow: "hidden",
        width: length,
        height: length,
      }}
    />
  )
}
const Avatar = ({ onPress, uri, length, style }) => {
  //If the length too short, then widen the border
  const borderWidth = length < 100 ? 1 : 2
  const outBorderLength = length < 100 ? length * 1.2 : length * 1.05

  return onPress ? (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderWidth: borderWidth,
          width: outBorderLength,
          height: outBorderLength,
        },
        style,
      ]}
      onPress={onPress}>
      <ImageWrapper url={uri} length={length} />
    </TouchableOpacity>
  ) : (
    <View
      style={[
        styles.container,
        {
          borderWidth: borderWidth,
          width: outBorderLength,
          height: outBorderLength,
        },
        style,
      ]}>
      <ImageWrapper url={uri} length={length} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
  },
})
export default Avatar
