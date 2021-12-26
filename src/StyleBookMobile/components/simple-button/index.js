import React from "react"
import { Text, View, TouchableOpacity } from "react-native"

const SimpleButton = (props) => {
  const {
    icon,
    text,
    onPress,
    firstItem,
    noBorder,
    style,
    fontStyle,
    color = "#dfe4ea",
  } = props
  return (
    <View
      style={[
        {
          borderBottomWidth: firstItem || noBorder ? 0 : 1,
          borderTopWidth: noBorder ? 0 : 1,
          borderColor: color,
          paddingVertical: 10,
          justifyContent: "center",
        },
        style,
      ]}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          {icon && React.createElement(icon, { width: 30, height: 30 })}
          <Text
            style={[
              {
                fontFamily: "SF Pro Display Semibold",
                color: color,
                fontSize: 15,
                marginHorizontal: 10,
              },
              fontStyle,
            ]}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SimpleButton
