import React from "react"
import { View, StyleSheet } from "react-native"

import HalfStar from "../../assets/icons/half-star"
import FillStar from "../../assets/icons/fill-star"
import OutlineStar from "../../assets/icons/outline-star"

const RatingStars = ({ height, width, totalStars, rate }) => {
  if (!rate) {
    const emptyIcon = []
    for (let i = 0; i < totalStars; i++) {
      emptyIcon.push(<OutlineStar key={i} width={width} height={height} />)
    }
    return <View style={styles.container}>{emptyIcon.map((item) => item)}</View>
  }

  const temp = Math.round(rate * 2) / 2
  let halfStar = true
  let fillStar = null
  if (temp === Math.round(rate)) {
    halfStar = false
    fillStar = temp
  } else fillStar = Math.floor(rate)

  const fillIcon = []
  for (let i = 0; i < fillStar; i++)
    fillIcon.push(<FillStar key={i} width={width} height={height} />)

  const outlineIcon = []
  const outlineStar = totalStars - fillStar - (halfStar && 1)
  for (let i = 0; i < outlineStar; i++)
    outlineIcon.push(<OutlineStar key={i} width={width} height={height} />)

  return (
    <View style={styles.container}>
      {fillIcon.map((item) => item)}
      {halfStar && <HalfStar width={width} height={height} />}
      {outlineIcon.map((item) => item)}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
})

export default RatingStars
