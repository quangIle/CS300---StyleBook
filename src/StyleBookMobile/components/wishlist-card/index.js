import React from "react"
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native"
import Avatar from "../avatar"

import TrashSimpleRegularSmall from "../../assets/icons/trash-simple-regular-small.svg"
import CheckFillSmall from "../../assets/icons/check-fill-small.svg"
import XFillSmall from "../../assets/icons/x-fill-small.svg"

import { ConvertPrice } from "../../utils/number-formatter"
import FastImage from "../fast-image"

import { useDispatch } from "react-redux"
import {
  removeFromWishlist,
  setItemDetail,
  setModalLoadingVisible,
  displayModalMessage,
} from "../../redux/actions"

import { fetchItemDetailAsync } from "../../utils/server"

const WishlistCard = ({ item }) => {
  const dispatch = useDispatch()

  const {
    img, //photo,
    name, //title,
    shop, //brandName,
    stocks, //status,
    price,
    _id,
  } = item

  const onItemPressed = () => {
    dispatch(setItemDetail({ isWaiting: true }))
    fetchItemDetailAsync(item, (response, type) => {
      if (type === "success") {
        if (response.status === 0) {
          dispatch(setItemDetail({ ...response.data, ...item }))
        } else dispatch(displayModalMessage(response.message))
      } else dispatch(displayModalMessage(response.message))
    })
  }
  const removeItem = (id) => dispatch(removeFromWishlist(id))

  if (!shop) return null

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onItemPressed}
      activeOpacity={0.5}>
      <View style={styles.photoContainer} onPress={onItemPressed}>
        <FastImage
          source={{
            uri: img,
          }}
          style={styles.photo}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.brandInfoContainer}>
          <Avatar uri={shop.avatar} length={30} />

          <TouchableOpacity style={styles.brandInfo}>
            <Text style={styles.brandName}>{shop.name}</Text>
            <Text style={styles.price}>{ConvertPrice(price)}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => removeItem(_id)}>
            <TrashSimpleRegularSmall
              width={20}
              height={20}
              style={styles.iconTrash}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 5,
    flex: 0,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  photoContainer: {
    width: 125,
    height: 125,
    borderRadius: 10,
    margin: 10,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    marginTop: 10,
    fontFamily: "SF Pro Display Semibold",
    fontSize: 18,
    marginBottom: 5,
  },
  brandInfoContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  brandInfo: {
    marginLeft: 5,
    justifyContent: "space-around",
    flex: 1,
  },
  brandName: {
    fontFamily: "SF Pro Display Semibold",
    fontSize: 14,
  },
  status: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  price: {
    fontFamily: "SF Pro Display Regular",
    fontSize: 14,
  },
  iconTrash: {
    marginBottom: 5,
  },
})

export default WishlistCard
