import React, { useState, useRef } from "react"
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { displayModalMessage, displayModalConfirm } from "../../redux/actions"

import ShadowButton from "../shadow-button"

const ModalNotification = () => {
  const dispatch = useDispatch()
  const [readyToOpen, setReadyToOpen] = useState(true)
  const opened = useRef(false)
  const { modalMessage, modalLoading, modalConfirm } = useSelector(
    (state) => state
  )
  const onClose = () => {
    dispatch(displayModalMessage(null))
    if (modalMessage.callback) modalMessage.callback()
  }
  const onCancel = () => {
    dispatch(displayModalConfirm(null))
    if (modalConfirm.callback) modalConfirm.callback(false)
  }
  const onConfirm = () => {
    dispatch(displayModalConfirm(null))
    if (modalConfirm.callback) modalConfirm.callback(true)
  }
  const isVisible = () => {
    return !!modalMessage.message || modalLoading || !!modalConfirm.message
  }

  //Fix ios modal bug
  if (Platform.OS === "ios" && isVisible() != opened.current) {
    opened.current = isVisible()
    if (!opened.current) setReadyToOpen(false)
  }

  const getComponent = () => {
    if (!!modalMessage.message)
      return (
        <>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage.message}</Text>
            <ShadowButton
              underlayColor={"#eb3b5a"}
              color={"#fc5c65"}
              style={{ width: "90%", marginTop: "5%" }}
              textStyle={{ color: "white" }}
              text={"Confirm"}
              onPress={onClose}
            />
          </View>
        </>
      )
    if (!!modalConfirm.message)
      return (
        <>
          <View style={styles.modalOverlay} />
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalConfirm.message}</Text>
            <ShadowButton
              underlayColor={"#eb3b5a"}
              color={"#fc5c65"}
              style={{ width: "80%", marginTop: "5%" }}
              textStyle={{ color: "white", fontSize: 20 }}
              text={"Confirm"}
              onPress={onConfirm}
            />
            <TouchableOpacity style={styles.cancelContainer} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      )
    if (modalLoading) {
      return (
        <>
          <View style={styles.modalOverlay} />
          <ActivityIndicator
            size="large"
            color="#eb3b5a"
            style={{
              aspectRatio: 1,
              height: 80,
              borderRadius: 20,
              backgroundColor: "white",
              transform: [{ scale: 1.25 }],
            }}
          />
        </>
      )
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible() && readyToOpen}
      onRequestClose={onClose}
      onDismiss={() => {
        setReadyToOpen(true)
      }}>
      <View style={styles.centeredView}>{getComponent()}</View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    borderRadius: 20,
    paddingVertical: "5%",
    backgroundColor: "white",
    alignItems: "center",
  },
  modalText: {
    marginVertical: 15,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "SF Pro Display Regular",
    width: "90%",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  cancelText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "SF Pro Display Semibold",
    color: "#616161",
  },
  cancelContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
})
export default ModalNotification
