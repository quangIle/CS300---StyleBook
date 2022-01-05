import React from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native"
import RatingCard from "../rating-card"

const Ratings = ({ ratings }) => {
  let k = 0
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ratings & Comments</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      {ratings?.map((rating) => (
        <RatingCard {...rating} key={k++} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
    flex: 0,
  },
  header: {
    flex: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: "SF Pro Display Bold",
    fontSize: 18,
  },
  seeAllText: {
    fontFamily: "SF Pro Display Regular",
    fontSize: 14,
    color: "#a1a1a1",
  },
})

export default Ratings
