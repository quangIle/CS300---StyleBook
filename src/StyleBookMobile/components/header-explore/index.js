import React from "react"
import { View, StyleSheet, Text } from "react-native"

const ExploreHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 46,
    marginTop: 6,
    paddingLeft: 20,
    paddingRight: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 0,
  },
  header: {
    fontFamily: "SF Pro Display Heavy",
    fontSize: 30,
  },
})

export default ExploreHeader
