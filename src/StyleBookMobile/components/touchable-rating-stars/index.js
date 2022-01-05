import React, { useState } from "react"
import { View, TouchableOpacity } from "react-native"

import FillStar from "../../assets/icons/fill-star"
import OutlineStar from "../../assets/icons/outline-star"

const TouchableRatingStars = ({ height, width, totalStars, value }) => {
  const [stars, setStars] = useState(value.current)
  const touchableArray = Array(totalStars).fill("star")

  const onStarSelected = (selectedIndex) => {
    setStars(selectedIndex + 1)
    value.current = selectedIndex + 1
  }

  return (
    <View
      style={{
        flexDirection: "row",
      }}>
      {touchableArray.map((item, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => onStarSelected(index)}>
            {index + 1 <= stars ? (
              <FillStar width={width} height={height} />
            ) : (
              <OutlineStar width={width} height={height} />
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default TouchableRatingStars
