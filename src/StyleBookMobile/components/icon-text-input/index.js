import React, { useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"

const IconTextInput = (props) => {
  const {
    placeholder,
    style,
    autoCompleteType,
    secureTextEntry,
    setText,
    value,
    editable,
  } = props
  const [input, setInput] = useState(value)
  return (
    <View
      style={[
        {
          alignItems: "center",
          alignSelf: "stretch",
        },
        style,
      ]}>
      <View style={styles.textInputContainer}>
        {props.children}
        <TextInput
          editable={editable}
          placeholder={placeholder}
          autoCompleteType={autoCompleteType}
          style={styles.textInput}
          secureTextEntry={secureTextEntry}
          value={input}
          onChangeText={(text) => {
            setText(text)
            setInput(text)
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textInputContainer: {
    borderColor: "#95A5A6",
    borderRadius: 2,
    borderBottomWidth: 2,
    width: "80%",
    height: 50,
    flexDirection: "row",
  },
  textInput: {
    fontFamily: "SF Pro Display Semibold",
    marginHorizontal: 10,
    flex: 1,
  },
})

export default IconTextInput
