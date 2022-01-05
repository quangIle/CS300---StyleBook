import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"

import RatingStars from "../../rating-stars"
import DotsThreeRegular from "../../../assets/icons/dots-three-regular.svg"

const RatingCard = ({ rating, author, content, img }) => {
  const [detailCollapsed, setDetailCollapsed] = useState(true)
  let key = 0
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarBorder}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: author.avatar,
              }}
              style={styles.avatar}
            />
          </View>
        </View>
        <View style={styles.userInfo}>
          <TouchableOpacity>
            <Text style={styles.username}>{author.name}</Text>
          </TouchableOpacity>
          <View style={styles.rating}>
            <RatingStars height={12} width={12} totalStars={5} rate={rating} />
          </View>
        </View>
        <TouchableOpacity>
          <DotsThreeRegular width={32} height={32} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() =>
          setDetailCollapsed((oldDetailCollapsed) => !oldDetailCollapsed)
        }>
        <Text style={styles.detail} numberOfLines={detailCollapsed ? 3 : 0}>
          {content}
        </Text>
      </TouchableOpacity>

      <View style={styles.photos}>
        {img?.map((photo) => (
          <TouchableOpacity style={styles.photoContainer} key={key++}>
            <Image
              source={{
                uri: photo,
              }}
              style={styles.photo}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    flex: 0,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    elevation: 10,
    marginTop: 10,
  },
  header: {
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 11,
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarBorder: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userInfo: {
    marginLeft: 7,
    justifyContent: "space-around",
    flex: 1,
  },
  username: {
    fontFamily: "SF Pro Display Semibold",
    fontSize: 12,
    marginBottom: 2,
    // borderWidth: 1,
  },
  rating: {
    alignItems: "flex-start",
    height: 14,
  },
  detail: {
    fontFamily: "SF Pro Display Regular",
    fontSize: 12,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  photos: {
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 0,
  },
  photoContainer: {
    width: 75,
    height: 75,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
})

export default RatingCard
