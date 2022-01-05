import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import AcceptIcon from '../../assets/icons/check-circle-fill.svg'
import DeclineIcon from '../../assets/icons/x-circle-fill.svg'

export default class ImageReview extends Component {
  constructor(props) {
    super(props)
  }

  acceptImage = () => {
    this.props.acceptImage()
  }

  declineImage = () => {
    this.props.declineImage()
  }

  render() {
    const { uri } = this.props
    return (
      <ImageBackground source={{ uri: uri ? uri : null }} style={styles.image}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity //Decline
            onPress={this.declineImage}
          >
            <DeclineIcon height="100%" fill="white" aspectRatio={1} />
          </TouchableOpacity>
          <TouchableOpacity //Accept
            onPress={this.acceptImage}
          >
            <AcceptIcon height="100%" fill="white" aspectRatio={1} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    flex: 1,
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '10%',
    marginHorizontal: '5%',
  },
})
