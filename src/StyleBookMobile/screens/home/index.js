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
  addToWishlist,
  setItemDetail,
  displayModalMessage,
} from "../../redux/actions"
// server
import { fetchItemDetailAsync, getItemsAsync } from "../../utils/server"

const { width, height } = Dimensions.get("window")

const HomeScreen = () => {
  const dispatch = useDispatch()

  const [items, setItems] = useState([])

  const getMoreItems = () => {
    getItemsAsync((response, type) => {
      if (type === "success") {
        if (response.status === 0) {
          const newItems = response.data
          newItems.map((item) => loadImage(item.img, null))

          for (const card of cards.current) {
            //Rearrange the image after update
            const layerValue = Math.abs(card.layer.value)
            card.item =
              newItems.length <= layerValue ? null : newItems[layerValue]
          }

          setItems(newItems)
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
        if (response.status === 0) {
          dispatch(setItemDetail({ ...response.data, ...item }))
        } else dispatch(displayModalMessage(response.message))
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
    const newItems = items.filter(({ _id }) => _id !== swipedItem._id)
    //The first card go in the back, then move the rest up to one
    for (const card of cards.current) {
      if (card.item?._id === swipedItem._id)
        card.item = newItems[cards.current.length - 1]
          ? newItems[cards.current.length - 1]
          : null
      card.layer.value++
    }
    if (isLike) dispatch(addToWishlist(swipedItem))
    setItems(newItems)
  }
  useEffect(() => {
    getMoreItems()
  }, [])
  // swipe up animation
  const onSwipeUp = (resetCardPosition) => {
    onFetchItemDetail(items[0])
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
