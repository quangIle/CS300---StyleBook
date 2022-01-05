import React, { useEffect, useState } from "react"
import { View } from "react-native"

import ModalPost from "../../components/modal-post"
import List from "./list"
import FloatingFeed from "../floating-feed"

import { loadPostFeedAsync } from "../../utils/server"
import { useDispatch } from "react-redux"
import {
  displayModalMessage,
  setModalLoadingVisible,
} from "../../redux/actions"

const Feed = (props) => {
  const { style = { flex: 1 }, username = "", onScroll } = props
  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [detailPost, setDetailPost] = useState(null)

  useEffect(() => {
    onLoadPostFeed()
  }, [])

  const onLoadPostFeed = () => {
    dispatch(setModalLoadingVisible(true))
    loadPostFeedAsync(username, (response, type) => {
      dispatch(setModalLoadingVisible(false))
      if (type === "success") {
        if (response.status === 0) {
          setData(response.data)
        } else dispatch(displayModalMessage(response.message))
      } else dispatch(displayModalMessage(response.message))
    })
  }

  return (
    <View style={[{ paddingHorizontal: 5 }, style]}>
      <ModalPost visible={detailPost} setVisible={setDetailPost} />
      <List
        ListHeaderComponent={props.ListHeaderComponent}
        data={data}
        renderItem={({ item }) => (
          <FloatingFeed
            key={item._id}
            item={item}
            openDetailPost={() => setDetailPost(item)}
          />
        )}
        onScroll={onScroll}
        numColumns={2}
      />
    </View>
  )
}
export default Feed
