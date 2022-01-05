import React, { useState, useRef, useEffect } from "react"
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Image,
  Keyboard,
  Text,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useRoute } from "@react-navigation/core"

import TouchableRatingStars from "../../components/touchable-rating-stars"
//Icons
import CameraIcon from "../../assets/icons/camera.svg"
import GalleryIcon from "../../assets/icons/image-square-fill-dark.svg"
import RemoveImageIcon from "../../assets/icons/file-x.svg"

import { useNavigation } from "@react-navigation/core"
import { SafeAreaView } from "react-native-safe-area-context"

import { useSelector, useDispatch } from "react-redux"
import { uploadPostAsync } from "../../utils/server"

import { displayModalMessage } from "../../redux/actions"
import Header from "../../components/header"
import FastImage from "../../components/fast-image"
import SimpleButton from "../../components/simple-button"

const CreatePost = (props) => {
  const UPLOAD_PICTURE = "UPLOAD_PICTURE"

  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()

  const item = route.params?.item
  const [uploadImage, setUploadImage] = useState("")
  const [postContent, setPostContent] = useState("")
  const rating = useRef(0)

  const choosePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })

    if (!result.cancelled) setUploadImage(result.uri)
  }
  const havePicture = () => uploadImage.length > 0

  const onUploadPost = () => {
    if (!havePicture()) {
      dispatch(displayModalMessage("You can not write post without a picture"))
      return
    }
    if (item && rating.current == 0) {
      dispatch(displayModalMessage("You have to rate the item"))
      return
    }
    uploadPostAsync(
      uploadImage,
      postContent,
      rating.current,
      item._id,
      (response, type) => {
        if (type === "success") {
          if (response.status === 1) {
            dispatch(displayModalMessage("Posted successfully"))
            navigation.goBack()
          } else dispatch(displayModalMessage(response.message))
        } else dispatch(displayModalMessage(response.message))
      }
    )
  }

  const openCamera = () => {
    navigation.navigate("Camera", {
      screen: route.name,
      actionType: UPLOAD_PICTURE,
    })
  }
  useEffect(() => {
    if (!route.params?.result) return

    switch (route.params?.actionType) {
      case UPLOAD_PICTURE:
        setUploadImage(route.params.result)
        route.params.result = undefined
        route.params.actionType = undefined
        break
      default:
        break
    }
  }, [route.params?.result])
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={"Create post"}
        onBackPress={() => navigation.goBack()}
        onDonePress={onUploadPost}
        confirmText={"Post"}
        backText={"Back"}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        {havePicture() && (
          <Image style={styles.imageContainer} source={{ uri: uploadImage }} />
        )}

        {!havePicture() ? (
          <>
            <SimpleButton
              style={{
                height: 50,
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderTopWidth: 0,
                borderColor: "#dfe4ea",
              }}
              icon={GalleryIcon}
              fontStyle={{ color: "#57606f" }}
              onPress={choosePicture}
              text={"Choose picture"}
            />
            <SimpleButton
              noBorder
              style={{
                height: 50,
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderTopWidth: 0,
                borderColor: "#dfe4ea",
              }}
              icon={CameraIcon}
              fontStyle={{ color: "#57606f" }}
              onPress={openCamera}
              text={"Take picture"}
            />
          </>
        ) : (
          <SimpleButton
            noBorder
            style={{
              height: 50,
              paddingHorizontal: 10,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderColor: "#dfe4ea",
            }}
            icon={RemoveImageIcon}
            fontStyle={{ color: "#fc5c65" }}
            onPress={() => {
              setUploadImage("")
            }}
            text={"Remove picture"}
            color={"#95A5A6"}
          />
        )}

        <TextInput
          style={styles.post}
          value={postContent}
          onChangeText={setPostContent}
          placeholder={"Write something here..."}
          returnKeyType="done"
          multiline={true}
          blurOnSubmit={true}
          textAlignVertical={"center"}
          onSubmitEditing={() => {
            Keyboard.dismiss()
          }}
        />

        {item && (
          <View style={styles.rating}>
            <FastImage
              source={{ uri: item.img }}
              style={{
                aspectRatio: 0.8,
                height: "100%",
              }}
            />
            <View style={{ height: "100%", padding: 20 }}>
              <Text
                style={{
                  fontFamily: "SF Pro Display Bold",
                  fontSize: 20,
                }}>
                {item.name}
                {"\n\n"}
                <Text
                  style={{
                    fontFamily: "SF Pro Display Regular",
                    fontSize: 15,
                  }}>
                  Your rating:{" "}
                </Text>
              </Text>
              <TouchableRatingStars
                height={25}
                width={25}
                totalStars={5}
                value={rating}
              />
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    flex: 2,
    backgroundColor: "black",
    resizeMode: "contain",
  },
  functionContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: "8%",
  },
  post: {
    height: "20%",
    fontFamily: "SF Pro Display Regular",
    fontSize: 18,
    padding: 20,
    marginTop: 10,
    borderColor: "#dfe4ea",
    borderBottomWidth: 1,
  },
  rating: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#dfe4ea",
    borderBottomWidth: 1,
  },
})
export default CreatePost
