import React, { useEffect, useCallback, useState } from "react"
import {
  StyleSheet,
  Dimensions,
  View,
  BackHandler,
  Text,
  Image,
} from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { ConvertPrice } from "../../utils/number-formatter"

import * as Linking from "expo-linking"
import CreditCardFill from "../../assets/icons/credit-card-fill"
import CarretLeftIcon from "../../assets/icons/caret-left"

import ShadowButton from "../shadow-button"
import ItemDetail from "./item-detail"
import BrandInfo from "./brand-info"
import Ratings from "./ratings"
import RelatedProducts from "./related-products"
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  Easing,
  runOnJS,
  withDecay,
  useSharedValue,
} from "react-native-reanimated"
import { PanGestureHandler } from "react-native-gesture-handler"
import FastImage from "../fast-image"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useSelector, useDispatch } from "react-redux"
import { setItemDetail, setModalLoadingVisible } from "../../redux/actions"

const { width, height } = Dimensions.get("window")

const PostDetail = () => {
  const dispatch = useDispatch()
  const [orderBarVisible, showOrderBar] = useState(false)
  const itemDetail = useSelector((state) => state.itemDetail)

  const detailPosition = useSharedValue(height)
  useEffect(() => {
    if (itemDetail?.isWaiting) {
      dispatch(setModalLoadingVisible(true))
      detailPosition.value = withTiming(insets.top, {
        duration: Platform.OS == "android" ? 1500 : 500,
        easing: Easing.inOut(Easing.exp),
      })
      showOrderBar(true)
    }
    return () => dispatch(setModalLoadingVisible(false))
  }, [itemDetail])

  const onCloseDetail = () => {
    const clearItemDetail = () => dispatch(setItemDetail(null))
    showOrderBar(false)
    detailPosition.value = withTiming(
      height,
      {
        duration: 500,
        easing: Easing.inOut(Easing.exp),
      },
      () => runOnJS(clearItemDetail)()
    )
  }
  const backAction = () => {
    if (itemDetail) {
      onCloseDetail()
      return true
    }
    return false
  }

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      )
      return () => backHandler.remove()
    }, [itemDetail])
  )
  const detailMovingStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: detailPosition.value }],
    }
  })

  const insets = useSafeAreaInsets()
  const viewHeight = useSharedValue(0)
  const onLayoutResized = ({ nativeEvent }) => {
    viewHeight.value = nativeEvent.layout.height
  }
  const MAX_PULL_DOWN_HEIGHT = insets.top
  const ORDER_BAR_HEIGHT = height * 0.07 + insets.bottom

  const detailEventHandler = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      detailPosition.value = detailPosition.value // stop screen while the screen is scrolling
      ctx.y = detailPosition.value
    },
    onActive: (e, ctx) => {
      const MAX_PULL_UP_HEIGHT = height - viewHeight.value - ORDER_BAR_HEIGHT
      detailPosition.value = e.translationY + ctx.y
      if (detailPosition.value < MAX_PULL_UP_HEIGHT)
        detailPosition.value = MAX_PULL_UP_HEIGHT
    },
    onEnd: (e, ctx) => {
      if (detailPosition.value > MAX_PULL_DOWN_HEIGHT + height * 0.2) {
        runOnJS(onCloseDetail)()
      } else {
        const MAX_PULL_UP_HEIGHT = height - viewHeight.value - ORDER_BAR_HEIGHT
        const velocity = 10 + e.velocityY
        detailPosition.value = withDecay({
          velocity: velocity,
          clamp: [MAX_PULL_UP_HEIGHT, MAX_PULL_DOWN_HEIGHT],
        })
      }
    },
  })

  if (!itemDetail) return <View />

  const {
    _id: itemId,
    shop: brandInfo,
    reviews: ratings,
    related_items: relatedProducts,
    img: imgUrl,
  } = itemDetail
  return (
    <View>
      <PanGestureHandler onGestureEvent={detailEventHandler}>
        <Animated.View
          style={[styles.container, detailMovingStyle]}
          onLayout={onLayoutResized}>
          {itemDetail.isWaiting ? (
            <View style={styles.emptyView} />
          ) : (
            <>
              <View
                style={{
                  width: "100%",
                  height: height * 0.525,
                  overflow: "hidden",
                  marginBottom: 20,
                  borderRadius: 20,
                }}>
                {React.createElement(FastImage, {
                  source: { uri: imgUrl },
                  style: {
                    width: "100%",
                    height: "100%",
                  },
                })}
                <ShadowButton
                  underlayColor={"clear"}
                  color={"white"}
                  style={{
                    position: "absolute",
                    width: "10%",
                    aspectRatio: 1,
                    borderRadius: 50,
                    top: 20,
                    left: 20,
                    padding: 0,
                  }}
                  iconSize={"80%"}
                  icon={CarretLeftIcon}
                  onPress={onCloseDetail}
                />
              </View>
              <ItemDetail
                item={itemDetail}
                onCloseDetail={onCloseDetail}
                key={itemId}
              />
              {brandInfo && <BrandInfo {...brandInfo} />}
              {ratings && <Ratings ratings={ratings} />}
              {relatedProducts && (
                <RelatedProducts products={relatedProducts} />
              )}
            </>
          )}
        </Animated.View>
      </PanGestureHandler>
      {orderBarVisible && itemDetail.price && (
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingBottom: insets.bottom / 2,
            //Size
            width: width,
            height: ORDER_BAR_HEIGHT,
            top: height - ORDER_BAR_HEIGHT,
            backgroundColor: "white",
            borderTopColor: "#dfe6e9",
            borderTopWidth: 1,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "SF Pro Display Bold",
              textAlign: "center",
            }}
            numberOfLines={1}>
            {ConvertPrice(itemDetail.price)}
          </Text>
          <ShadowButton
            underlayColor={"#f9ca24"}
            color={"#ffc533"}
            style={{ width: 180, height: 58 }}
            textStyle={{ color: "white" }}
            text={"Order now"}
            icon={CreditCardFill}
            onPress={() => {
              if (!itemDetail.link || itemDetail.link.length == 0) return
              //TO DO: Track redirect times
              Linking.openURL(itemDetail.link)
            }}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    height: "100%",
  },
  emptyView: {
    width: "100%",
    height: height,
    backgroundColor: "white",
  },
})

export default PostDetail
