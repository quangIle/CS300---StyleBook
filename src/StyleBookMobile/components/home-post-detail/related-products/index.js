import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native"
import FastImage from "../../fast-image"

const RelatedProducts = ({ products }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Related Products</Text>
      <ScrollView
        contentContainerStyle={styles.rowContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {products.map((product, i) => (
          <TouchableOpacity
            style={styles.cardHolder}
            key={i}
            // onPress={() => navigation.navigate("Post", {id: id})}
          >
            <FastImage
              source={{
                uri: product.img,
              }}
              style={styles.smallPoster}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 0,
    marginTop: 25,
  },
  header: {
    fontFamily: "SF Pro Display Bold",
    marginHorizontal: 20,
    fontSize: 18,
    marginBottom: 10,
  },
  rowContainer: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 20,
  },
  cardHolder: {
    width: 128,
    height: 192,
    borderRadius: 20,
    marginRight: 10,
    // marginTop: 10,
    // marginBottom: 15,
    overflow: "hidden",
    elevation: 10,
    backgroundColor: "#F1F1F1",
  },
  smallPoster: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
})

export default RelatedProducts
