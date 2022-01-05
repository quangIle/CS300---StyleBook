import React from "react"
import IconTextInput from "../../components/icon-text-input"
import ShadowButton from "../shadow-button"

const Form = (props) => {
  const { form, onCommit, buttonText } = props
  return (
    <>
      {form.map((item) => {
        return (
          <IconTextInput
            key={item.key}
            placeholder={item.text}
            style={{ marginVertical: "5%" }}
            secureTextEntry={item.secureTextEntry}
            setText={(text) => {
              item.value = text
            }}
            editable={item.editable !== null ? item.editable : true}
            value={item.value}>
            {React.createElement(
              item.icon,
              { width: "10%", height: "100%" },
              null
            )}
          </IconTextInput>
        )
      })}
      {buttonText && onCommit && (
        <ShadowButton
          underlayColor={"#eb3b5a"}
          color={"#fc5c65"}
          style={{ width: "80%", marginTop: "5%" }}
          textStyle={{ color: "white" }}
          text={buttonText}
          onPress={onCommit}
        />
      )}
    </>
  )
}

export default Form
