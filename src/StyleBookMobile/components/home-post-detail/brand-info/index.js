import React from "react"
import { View, StyleSheet, Image, Text } from "react-native"
import numberFormatter from "../../../utils/number-formatter"

const BrandInfo = ({ avatar, name, itemCount }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shop info</Text>
      <View style={styles.brand}>
        <View style={styles.avatarBorder}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: avatar,
              }}
              style={styles.avatar}
            />
          </View>
        </View>
        <View style={styles.brandInfo}>
          <Text style={styles.brandName}>{name}</Text>
          <Text style={styles.brandProducts}>
            {numberFormatter(itemCount, 1)} Products
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  brand: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarBorder: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
  },
  avatar: {
    width: 52,
    height: 52,
    resizeMode: "cover",
  },
  header: {
    fontFamily: "SF Pro Display Bold",
    fontSize: 18,
    marginBottom: 10,
  },
  brandInfo: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  brandName: {
    fontFamily: "SF Pro Display Semibold",
    fontSize: 20,
  },
  brandProducts: {
    fontFamily: "SF Pro Display Regular",
    fontSize: 12,
    color: "#a1a1a1",
  },
})

export default BrandInfo
