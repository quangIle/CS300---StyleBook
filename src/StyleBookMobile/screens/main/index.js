import React from "react"
import { StyleSheet, View } from "react-native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import HomeScreen from "../home"
import WishlistScreen from "../wishlist"
import Profile from "../profile"
import ExploreScreen from "../explore"
import PostDetail from "../../components/home-post-detail"

import HomeFill from "../../assets/icons/home-fill.svg"
import HomeRegular from "../../assets/icons/home-regular.svg"

import HeartFill from "../../assets/icons/heart-fill.svg"
import HeartRegular from "../../assets/icons/heart-regular.svg"

import UserFill from "../../assets/icons/user-fill.svg"
import UserRegular from "../../assets/icons/user-regular.svg"

import ExploreFill from "../../assets/icons/magnifying-glass-fill.svg"
import ExploreRegular from "../../assets/icons/magnifying-glass-regular.svg"

const Tab = createBottomTabNavigator()

const Main = () => {
  // add initialRouteName & backBehaviour for Android device
  return (
    <View style={styles.main}>
      <Tab.Navigator
        initialRouteName={"Home"}
        backBehavior={"initialRoute"}
        tabBarOptions={{
          showLabel: false,
          style: styles.navigator,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <HomeFill
                  width={"40%"}
                  height={"100%"}
                  style={styles.highlight}
                />
              ) : (
                <HomeRegular width={"40%"} height={"100%"} />
              ),
          }}
        />
        <Tab.Screen
          name="Wishlist"
          component={WishlistScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <HeartFill
                  width={"40%"}
                  height={"100%"}
                  style={styles.highlight}
                />
              ) : (
                <HeartRegular width={"40%"} height={"100%"} />
              ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <ExploreFill
                  width={"40%"}
                  height={"100%"}
                  style={styles.highlight}
                />
              ) : (
                <ExploreRegular width={"40%"} height={"100%"} />
              ),
          }}
        />
        <Tab.Screen
          name="User"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <UserFill
                  width={"40%"}
                  height={"100%"}
                  style={styles.highlight}
                />
              ) : (
                <UserRegular width={"40%"} height={"100%"} />
              ),
          }}
        />
      </Tab.Navigator>
      <View style={styles.postDetailContainer}>
        <PostDetail />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    height: "100%",
  },
  navigator: {
    height: "10%",
    zIndex: 0,
    shadowOpacity: 0,
    elevation: 0,
    borderTopWidth: 0,
    alignItems: "center",
  },
  postDetailContainer: {
    position: "absolute",
    elevation: 11,
    width: "100%",
  },
  highlight: {},
  tryOnButton: {
    backgroundColor: "#ff8900",
    shadowColor: "#e07902",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    aspectRatio: 1,
    borderRadius: 10,
  },
})

export default Main
