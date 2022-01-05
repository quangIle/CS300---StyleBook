import { RefreshControl, ScrollView, View } from "react-native"
import React, { useState } from "react"

const isCloseToBottom = (
  { layoutMeasurement, contentOffset, contentSize },
  onEndReachedThreshold
) => {
  const paddingToBottom = contentSize.height * onEndReachedThreshold

  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  )
}

function List(props) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const {
    keyPrefix,
    refreshing,
    data,
    innerRef,
    ListHeaderComponent,
    ListEmptyComponent,
    ListFooterComponent,
    ListHeaderComponentStyle,
    containerStyle,
    contentContainerStyle,
    renderItem,
    onEndReachedThreshold,
    onEndReached,
    onRefresh,
    loading,
    LoadingView,
    numColumns = 2,
    horizontal,
    onScroll,
  } = props

  const { style, ...propsWithoutStyle } = props

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      {...propsWithoutStyle}
      ref={innerRef}
      style={[{ flex: 1, alignSelf: "stretch" }, containerStyle]}
      contentContainerStyle={contentContainerStyle}
      removeClippedSubviews={true}
      refreshControl={
        <RefreshControl
          refreshing={!!(refreshing || isRefreshing)}
          onRefresh={() => {
            setIsRefreshing(true)
            onRefresh?.()
            setIsRefreshing(false)
          }}
        />
      }
      scrollEventThrottle={1}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent, onEndReachedThreshold || 0.1)) {
          onEndReached?.()
        } else if (onScroll) onScroll(nativeEvent)
      }}>
      {ListHeaderComponent}
      {data.length === 0 && ListEmptyComponent ? (
        React.isValidElement(ListEmptyComponent) ? (
          ListEmptyComponent
        ) : (
          <ListEmptyComponent />
        )
      ) : (
        <View
          style={[
            {
              flex: 1,
              flexDirection: horizontal ? "column" : "row",
            },
            style,
          ]}>
          {Array.from(Array(numColumns), (_, num) => {
            return (
              <View
                key={`${keyPrefix}-${num.toString()}`}
                style={{
                  flex: 1 / numColumns,
                  flexDirection: horizontal ? "row" : "column",
                }}>
                {data
                  .map((el, i) => {
                    if (i % numColumns === num)
                      return renderItem({ item: el, i })

                    return null
                  })
                  .filter((e) => !!e)}
              </View>
            )
          })}
        </View>
      )}
      {loading && LoadingView}
      {ListFooterComponent}
    </ScrollView>
  )
}

export default List
