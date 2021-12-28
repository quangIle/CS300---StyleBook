import React, { useEffect, useState, useRef, useCallback } from "react"

import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  BackHandler,
  Alert,
  Text,
} from "react-native"
import {
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated"
import HomeHeader from "../../components/header-home"
import SwipableCard from "../../components/swipable-card"
import { loadImage } from "../../components/fast-image"
import PostDetail from "../../components/home-post-detail"
import { useSafeAreaInsets } from "react-native-safe-area-context"
//Redux
import { useDispatch, useSelector } from "react-redux"
import {
  addToSwipe,
  addToSwipedList,
  addToWishlist,
  setWishlist,
  setItemDetail,
  setModalLoadingVisible,
  clearSwipedList,
  clearRemovedItemsInWishlist,
  displayModalMessage,
} from "../../redux/actions"
// server
import {
  fetchItemsAsync,
  fetchItemDetailAsync,
  fetchWishlistAsync,
} from "../../utils/server"
// navigation
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native"

const { width, height } = Dimensions.get("window")

const HomeScreen = () => {
  // const account = useSelector((state) => state.auth.accountInformation)
  // const items = useSelector((state) => state.swipe)
  // temporary not get items from redux

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  const cursor = useRef("")
  const items = useRef([])

  const [render, setRender] = useState(false)
  // TODO: optimize fetch item to reduce server call
  const getMoreItems = (callback) => {
    fetchItemsAsync(cursor.current, (response, type) => {
      if (type === "success") {
        if (response.status === 1) {
          if (callback) callback()

          dispatch(clearSwipedList())
          dispatch(clearRemovedItemsInWishlist())

          const newItems = response.data.itemFeed
          cursor.current = response.data.cursor

          newItems.map((item) => loadImage(item.img[0], null))
          // dispatch(addToSwipe(newItems))
          items.current.push(...newItems)

          const idSet = new Set()
          // check if prevState is null
          items.current = items.current.filter(
            ({ _id }) => !idSet.has(_id) && idSet.add(_id)
          )

          for (const card of cards.current) {
            //Rearrange the image after update
            const layerValue = Math.abs(card.layer.value)
            card.item =
              items.current.length <= layerValue
                ? null
                : items.current[layerValue]
          }

          setRender((prevState) => !prevState)
        } else dispatch(displayModalMessage(response.message))
      } else {
        dispatch(displayModalMessage(response.message))
      }
    })
  }

  const onFetchItemDetail = (item) => {
    dispatch(setItemDetail({ isWaiting: true }))
    fetchItemDetailAsync(item, (response, type) => {
      if (type === "success") {
        if (response.status === 1) {
          dispatch(setItemDetail({ ...response.data, ...item }))
        } else dispatch(displayModalMessage(response.message))
      } else dispatch(displayModalMessage(response.message))
    })
  }
  const onFetchWishlist = () => {
    fetchWishlistAsync((response, type) => {
      if (type === "success") {
        if (response.status === 1) dispatch(setWishlist(response.data))
        else dispatch(displayModalMessage(response.message))
      } else dispatch(displayModalMessage(response.message))
    })
  }

  const cards = useRef([
    {
      layer: useSharedValue(0),
      item: null,
    },
    {
      layer: useSharedValue(-1),
      item: null,
    },
    {
      layer: useSharedValue(-2),
      item: null,
    },
    {
      layer: useSharedValue(-3),
      item: null,
    },
    {
      layer: useSharedValue(-4),
      item: null,
    },
    {
      layer: useSharedValue(-5),
      item: null,
    },
  ])
  const onSwipe = async (isLike, item) => {
    const swipedItem = item
    items.current = items.current.filter(({ _id }) => _id !== swipedItem._id)
    //The first card go in the back, then move the rest up to one
    for (const card of cards.current) {
      if (card.item?._id === swipedItem._id)
        card.item = items.current[cards.current.length - 1]
          ? items.current[cards.current.length - 1]
          : null
      card.layer.value++
    }
    if (isLike) {
      dispatch(addToSwipedList(swipedItem._id))
      dispatch(addToWishlist(swipedItem))
    }
    if (!items.current[cards.current.length]) getMoreItems()

    setRender(!render)
  }
  // QR code
  useEffect(() => {
    if (route.params?.qrData) {
      onFetchItemDetail({ _id: route.params?.qrData })
      route.params.qrData = null
    }
  })

  useFocusEffect(
    useCallback(() => {
      return () => (items.current.length < 20 ? getMoreItems() : null)
    }, [])
  )
  useEffect(() => {
    //get feed item then wishlist item -> serialize
    getMoreItems(onFetchWishlist)
  }, [])
  useEffect(() => {
    const tabPress = navigation.addListener("tabPress", () =>
      items.current.length < 20 ? getMoreItems() : null
    )
    return tabPress
  }, [navigation])
  // !!!!temporary comment for future exit app feature
  // const backAction = () => {
  //   Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //     {
  //       text: "Cancel",
  //       onPress: () => null,
  //       style: "cancel",
  //     },
  //     { text: "YES", onPress: () => BackHandler.exitApp() },
  //   ])
  //   return true
  // }
  // swipe up animation
  const onSwipeUp = (resetCardPosition) => {
    onFetchItemDetail(items.current[0])
    //TODO: handle this properly
    setTimeout(
      () => {
        resetCardPosition()
      },
      Platform.OS == "android" ? 1500 : 500
    )
  }
  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
      <StatusBar barStyle={"dark-content"} backgroundColor="#ffffff" />
      <View style={styles.main}>
        <HomeHeader />
        <View style={styles.swipableCardContainer}>
          {cards.current.map((card, index) => {
            return (
              <SwipableCard
                key={index}
                switchKey={card.layer}
                onSwipe={onSwipe}
                onSwipeUp={onSwipeUp}
                item={card.item}
                spot={cards.current.length}
              />
            )
          })}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    height: "100%",
  },
  postDetailContainer: {
    position: "absolute",
    elevation: 11,
    width: "100%",
  },
  swipableCardContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default HomeScreen
