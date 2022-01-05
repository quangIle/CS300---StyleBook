import React, { useEffect, useState } from "react"

import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native"

import ExploreHeader from "../../components/header-explore"

//Icons
import PlusIcon from "../../assets/icons/plus.svg"
import { useNavigation } from "@react-navigation/native"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Feed from "../../components/feed"
import ShadowButton from "../../components/shadow-button"

const { width, height } = Dimensions.get("window")

const ExploreScreen = () => {
  const navigation = useNavigation()
  const tabBarHeight = useBottomTabBarHeight()
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
      <StatusBar barStyle={"dark-content"} backgroundColor="#ffffff" />
      <View style={styles.main}>
        <ExploreHeader />
        <Feed />
        <ShadowButton
          underlayColor={"#eb3b5a"}
          color={"#fc5c65"}
          style={{
            ...StyleSheet.absoluteFillObject,
            marginLeft: width - width * 0.05 - 60,
            marginTop: height - width * 0.05 - 60 - tabBarHeight - insets.top,
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
          icon={PlusIcon}
          iconSize={30}
          onPress={() => {
            navigation.navigate("Create post")
          }}
        />
      </View>
    </SafeAreaView>
  )
}
export default ExploreScreen

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    height: "100%",
  },
  lookupImage: {
    width: 30,
    height: 30,
  },
  exploreTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "12%",
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  exploreView: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
  },
  exploreTitle: {
    fontSize: 35,
    fontWeight: "bold",
  },
})
