import React, { useEffect, useState, useCallback } from "react"
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
} from "react-native"
import { useSelector } from "react-redux"
import WishlistHeader from "../../components/header-wishlist"
import WishlistCard from "../../components/wishlist-card"

const { width, height } = Dimensions.get("window")

const WishlistScreen = () => {
  const wishlist = useSelector((state) => state.wishlist)

  const [itemDetail, setItemDetail] = useState(null)

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
      <StatusBar barStyle={"dark-content"} backgroundColor="#ffffff" />
      <View style={styles.main}>
        <WishlistHeader />
        {wishlist && (
          <FlatList
            initialNumToRender={3}
            data={wishlist}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            style={styles.flatListContainer}
          />
        )}
      </View>
    </SafeAreaView>
  )
}
const renderItem = ({ item, index }) => (
  <WishlistCard index={index} item={item} />
)

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    height: "100%",
  },
  divider: {
    backgroundColor: "#DCDCDC",
    height: 1,
    width: "100%",
  },
  flatListContainer: { marginTop: "5%" },
})

export default WishlistScreen
