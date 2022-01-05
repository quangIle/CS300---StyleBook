import React from "react"
import { Text, TouchableHighlight } from "react-native"

const ShadowButton = (props) => {
  const {
    onPress,
    style,
    text,
    textStyle,
    underlayColor,
    color,
    icon,
    shadowColor,
    center,
    iconSize = 40,
  } = props
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.2}
      underlayColor={underlayColor}
      style={[
        {
          padding: 15,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: color,
          shadowColor: shadowColor ? shadowColor : underlayColor,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          flexDirection: icon && text && !center ? "row" : "column",
          shadowOpacity:
            (shadowColor ? shadowColor : underlayColor) != "clear" ? 0.5 : 0,
          shadowRadius:
            (shadowColor ? shadowColor : underlayColor) != "clear" ? 8 : 0,
          elevation:
            (shadowColor ? shadowColor : underlayColor) != "clear" ? 6 : 0,
        },
        style,
      ]}>
      <>
        {icon &&
          React.createElement(icon, { width: iconSize, height: iconSize })}
        {text && (
          <Text
            style={[
              {
                fontSize: 20,
                marginLeft: icon && !center ? 15 : 0,
                textAlign: "center",
                fontFamily: "SF Pro Display Semibold",
              },
              textStyle,
            ]}>
            {text}
          </Text>
        )}
      </>
    </TouchableHighlight>
  )
}

export default ShadowButton
