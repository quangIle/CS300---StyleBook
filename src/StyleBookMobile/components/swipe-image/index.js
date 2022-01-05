import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"

import { LinearGradient } from "expo-linear-gradient"
import Animated from "react-native-reanimated"

import HeartFill from "../../assets/icons/heart-fill.svg"
import FirstAidFill from "../../assets/icons/firstaid-fill.svg"
import FastImage from "../fast-image"
import { ConvertPrice } from "../../utils/number-formatter"

const SwipeImage = ({ likeAnimation, nopeAnimation, item, onSuccess }) => {
  return (
    <Animated.View style={[styles.container]}>
      <View style={styles.photoHeader}>
        {item == null ? (
          <View style={styles.photo} />
        ) : (
          <FastImage
            source={{
              uri: item.img,
            }}
            isBackground
            style={styles.photo}
            onSuccess={onSuccess}>
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,1)"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              locations={[0.8, 1]}
              style={styles.background}
            />
            <Text style={styles.price}>{ConvertPrice(item.price)}</Text>
            <Text style={styles.title}>{item.name}</Text>
          </FastImage>
        )}
      </View>
      <View
        style={{
          ...styles.cardHeader,
        }}>
        <Animated.View style={[styles.likeIcon, likeAnimation]}>
          <HeartFill width="100%" height="100%" />
        </Animated.View>
        <Animated.View style={[styles.nopeIcon, nopeAnimation]}>
          <FirstAidFill width="100%" height="100%" />
        </Animated.View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
    flex: 1,
    height: "85%",
    marginTop: "6%",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  photoHeader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#f1f1f1",
    height: "100%",
    width: "100%",
  },
  photo: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    backgroundColor: "#f1f1f1",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 10,
  },
  likeIcon: {
    width: 105,
    height: 105,
    marginLeft: 26,
    marginTop: 10,
    opacity: 0,
  },
  nopeIcon: {
    width: 144,
    height: 144,
    marginRight: 12,
    marginTop: 10,
    opacity: 0,
  },
  title: {
    marginHorizontal: 20,
    marginBottom: 20,
    fontFamily: "SF Pro Display Heavy",
    fontSize: 30,
    color: "white",
  },
  price: {
    marginHorizontal: 20,
    fontFamily: "SF Pro Display Bold",
    fontSize: 20,
    color: "white",
  },
})

export default SwipeImage
