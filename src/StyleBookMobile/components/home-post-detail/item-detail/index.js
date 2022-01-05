import React, { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import RatingStars from "../../rating-stars"
import SimpleButton from "../../simple-button"
import TShirtRegular from "../../../assets/icons/tshirt-regular.svg"
import WritePostIcon from "../../../assets/icons/note-pencil.svg"

import { useNavigation } from "@react-navigation/native"

const ItemDetail = (props) => {
  const { _id, name, rating, price, description, reviews } = props.item
  const onCloseDetail = props.onCloseDetail
  const [detailCollapsed, setDetailCollapsed] = useState(true)
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.ratingContainer}>
        <RatingStars
          height={15}
          width={15}
          totalStars={5}
          rate={rating / reviews.length}
        />
        <Text style={styles.ratingText}>
          {reviews && reviews.length > 0 ? rating / reviews.length : 0}{" "}
          <Text style={styles.totalRatingText}>({reviews.length} reviews)</Text>
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          setDetailCollapsed((oldDetailCollapsed) => !oldDetailCollapsed)
        }>
        <Text style={styles.detail} numberOfLines={detailCollapsed ? 3 : 0}>
          {description}
        </Text>
      </TouchableOpacity>
      {props.item.points && (
        <SimpleButton
          onPress={() => {
            navigation.navigate("Try on", { additionalItem: props.item })
            onCloseDetail()
          }}
          firstItem
          icon={TShirtRegular}
          text={"Try it on virtually"}
          fontStyle={{ color: "#57606f" }}
        />
      )}
      <SimpleButton
        onPress={() => navigation.navigate("Create post", { item: props.item })}
        icon={WritePostIcon}
        text={"Write your review"}
        fontStyle={{ color: "#57606f" }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: "SF Pro Display Bold",
    fontSize: 30,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontFamily: "SF Pro Display Bold",
    fontSize: 15,
    marginHorizontal: 8,
  },
  totalRatingText: {
    fontFamily: "SF Pro Display Regular",
    fontSize: 12,
    color: "#a1a1a1",
  },
  price: {
    fontFamily: "SF Pro Display Regular",
    fontSize: 30,
    textAlign: "center",
  },
  detail: {
    fontFamily: "SF Pro Display Regular",
    fontSize: 18,
    color: "#a1a1a1",
    marginTop: "2%",
    marginBottom: 30,
  },
  headerText: {
    fontFamily: "SF Pro Display Bold",
    fontSize: 18,
  },
})

export default ItemDetail
