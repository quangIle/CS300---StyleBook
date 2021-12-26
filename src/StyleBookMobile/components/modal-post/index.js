import React, { useState } from "react"
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import * as FileSystem from "expo-file-system"
import * as Crypto from "expo-crypto"
import * as Sharing from "expo-sharing"

import CloseIcon from "../../assets/icons/caret-left.svg"
import SettingIcon from "../../assets/icons/dots-three-regular.svg"
import AuthorInfo from "../author-info"
import FastImage from "../fast-image"
import ModalSetting from "../modal-setting"

import { deletePostAsync } from "../../utils/server"
import { displayModalMessage } from "../../redux/actions"

const { width, height } = Dimensions.get("window")
const ModalPost = (props) => {
  const dispatch = useDispatch()
  const [modalSetting, setModalSetting] = useState(null)
  const user = useSelector((state) => state.user)
  // if (!user || !user.user) return null
  const _id = 1
  const { visible, setVisible } = props
  const onDeletePost = () => {
    deletePostAsync(visible._id, (response, type) => {
      if (type === "success") {
        if (response.status === 1)
          dispatch(displayModalMessage("Deleted post successfully."))
        else dispatch(displayModalMessage(response.message))
      } else dispatch(displayModalMessage(response.message))
    })
  }
  const SharePost = async () => {
    const hashed = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      visible.img[0]
    )
    const directory = `${FileSystem.cacheDirectory}${hashed}`
    await Sharing.shareAsync(directory)
  }
  const postOwnerSettings = {
    title: "Settings",
    actions: [
      {
        title: "Share",
        colorIndex: 1,
        onPress: SharePost,
      },
      {
        title: "Delete post",
        colorIndex: 4,
        onPress: onDeletePost,
      },
    ],
  }
  const postSettings = {
    title: "Settings",
    actions: [
      {
        title: "Share",
        colorIndex: 1,
      },
      {
        title: "Block user",
        colorIndex: 4,
      },
    ],
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible != null}
      onRequestClose={() => setVisible(null)}>
      <ModalSetting setting={modalSetting} setModalSetting={setModalSetting} />
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback onPress={() => setVisible(null)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalView}>
          <View style={styles.ultView}>
            <TouchableOpacity onPress={() => setVisible(null)}>
              <CloseIcon width={32} height={32} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setModalSetting(
                  _id == visible.author._id ? postOwnerSettings : postSettings
                )
              }>
              <SettingIcon width={32} height={32} />
            </TouchableOpacity>
          </View>
          {visible && visible.img && visible.img.length > 0 && (
            <ScrollView>
              <FastImage
                style={styles.image}
                resizeMode="cover"
                source={{ uri: visible.img[0] }}
              />
              <View style={styles.feedText}>
                <AuthorInfo
                  author={visible.author}
                  likeNum={visible.like_count}
                  showAvatar
                />
                <Text style={styles.contentText}>{visible.content}</Text>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  )
}
const pw = 0.9
const ph = 0.75
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalView: {
    width: pw * 100 + "%",
    height: ph * 100 + "%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  image: {
    //The width match to the modalView, the heigth match to the common ratio 4:3
    width: width * pw,
    height: (width * pw * 4) / 3,
    backgroundColor: "white",
    alignSelf: "center",
  },
  ultView: {
    height: "8%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "3%",
    alignItems: "center",
  },
  modalText: {
    marginVertical: 15,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "SF Pro Display Regular",
  },
  feedText: {
    marginHorizontal: "5%",
    marginVertical: "2.5%",
    flexDirection: "column",
    flex: 1,
  },
  titleText: {
    fontSize: 15,
    color: "#9f47de",
    fontFamily: "SF Pro Display Bold",
  },
  contentText: {
    marginTop: 4,
    fontFamily: "SF Pro Display Regular",
    fontSize: 15,
  },
  likeText: {
    fontSize: 15,
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
export default ModalPost
