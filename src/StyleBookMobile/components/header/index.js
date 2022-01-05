import React from "react"
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native"

import CloseIcon from "../../assets/icons/x-close.svg"
const { width, height } = Dimensions.get("window")
const Header = (props) => {
  const {
    onDonePress,
    onBackPress,
    title,
    confirmIcon,
    confirmText,
    backText,
  } = props
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress} style={{ width: "15%" }}>
        {backText ? (
          <Text numberOfLines={1} style={styles.backText}>
            {backText}
          </Text>
        ) : (
          <CloseIcon width={"100%"} height={"70%"} />
        )}
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          width: "70%",
          fontFamily: "SF Pro Display Bold",
          textAlign: "center",
        }}
        numberOfLines={1}>
        {title}
      </Text>
      {onDonePress && (
        <TouchableOpacity onPress={onDonePress} style={{ width: "15%" }}>
          {confirmText ? (
            <Text numberOfLines={1} style={styles.confirmText}>
              {confirmText}
            </Text>
          ) : confirmIcon ? (
            React.createElement(confirmIcon, { width: "100%", height: "70%" })
          ) : (
            <CloseIcon width={"100%"} height={"70%"} />
          )}
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: height * 0.06,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#dfe4ea",
  },
  confirmText: {
    fontFamily: "SF Pro Display Semibold",
    fontSize: 18,
    textAlign: "left",
    color: "#fc5c65",
  },
  backText: {
    fontFamily: "SF Pro Display Regular",
    fontSize: 18,
    textAlign: "right",
    color: "black",
  },
})

export default Header
