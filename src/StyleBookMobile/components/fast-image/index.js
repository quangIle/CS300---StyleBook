import React, { Component } from "react"
import { View, Image, ImageBackground } from "react-native"
import * as FileSystem from "expo-file-system"
import * as Crypto from "expo-crypto"

const getImageFilesystemKey = async (remoteURI) => {
  const hashed = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    remoteURI
  )
  return `${FileSystem.cacheDirectory}${hashed}`
}

export const loadImage = async (remoteURI, callback) => {
  if (remoteURI == null || remoteURI.length == 0) return
  const filesystemURI = await getImageFilesystemKey(remoteURI)
  try {
    // Use the cached image if it exists
    const metadata = await FileSystem.getInfoAsync(filesystemURI)
    if (metadata.exists) {
      if (callback) callback(filesystemURI)
      return
    }

    // otherwise download to cache
    const imageObject = await FileSystem.downloadAsync(remoteURI, filesystemURI)
    if (callback) callback(imageObject.uri)
  } catch (err) {
    if (callback) callback(remoteURI)
  }
}

export default class FastImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgURI: "",
    }
    this.unmount = false
  }
  async componentDidMount() {
    this.unmount = false
    if (this.props.source.uri == null || this.props.source.uri.length == 0)
      return
    await loadImage(this.props.source.uri, (uri) => {
      if (this.unmount) return
      this.setState({ imgURI: uri })
    })
  }

  async componentDidUpdate() {
    if (this.props.source.uri == null || this.props.source.uri.length == 0)
      return
    const filesystemURI = await getImageFilesystemKey(this.props.source.uri)
    if (
      this.props.source.uri === this.state.imgURI ||
      filesystemURI === this.state.imgURI
    ) {
      return null
    }
    await loadImage(this.props.source.uri, (uri) => {
      if (this.unmount) return
      this.setState({ imgURI: uri })
    })
  }

  componentWillUnmount() {
    this.unmount = true
  }

  render() {
    return (
      <View>
        {this.props.isBackground ? (
          <ImageBackground
            {...this.props}
            source={this.state.imgURI ? { uri: this.state.imgURI } : null}
            onLoadEnd={
              this.props.onSuccess ? () => this.props.onSuccess() : null
            }>
            {this.props.children}
          </ImageBackground>
        ) : (
          <Image
            {...this.props}
            source={this.state.imgURI ? { uri: this.state.imgURI } : null}
            onLoadEnd={
              this.props.onSuccess ? () => this.props.onSuccess() : null
            }
          />
        )}
      </View>
    )
  }
}
