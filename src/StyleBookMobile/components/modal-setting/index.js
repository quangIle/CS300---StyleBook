import React from "react"
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from "react-native"
import SimpleButton from "../simple-button"

const ModalSetting = ({ setting, setModalSetting }) => {
  if (!setting) return <View />
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={setting != null}
      onRequestClose={() => setModalSetting(null)}>
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback onPress={() => setModalSetting(null)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalView}>
          {setting.title && setting.title.length > 0 && (
            <Text style={styles.modalText}>{setting.title}</Text>
          )}
          {setting.actions.map((item, index) => (
            <SimpleButton
              firstItem={true}
              style={styles.buttonStyle}
              fontStyle={{
                color: "black",
                fontFamily: "SF Pro Display Regular",
                fontSize: 18,
              }}
              icon={item.icon}
              key={index}
              text={item.title}
              onPress={item.onPress}
            />
          ))}
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonStyle: {
    paddingVertical: 15,
  },
  modalView: {
    width: "90%",
    borderRadius: 20,
    marginBottom: "10%",
    padding: "2%",
    backgroundColor: "white",
    alignItems: "stretch",
  },
  modalText: {
    marginVertical: "3%",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "SF Pro Display Bold",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
})
export default ModalSetting
