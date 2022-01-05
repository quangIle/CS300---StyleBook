import React from 'react'
import {TouchableHighlight, StyleSheet} from 'react-native'
import FastImage from '../fast-image';
export default class ImageCard extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        const {onPress, height, source, onLoadEnd, transparent, shadow, onLongPress} = this.props;
        return (
            <TouchableHighlight
            style = {[styles.feedImage,this.props.style, shadow && styles.shadow]}
            onPress = {onPress}
            onLongPress = {onLongPress}
            underlayColor = {transparent ? 'transparent' : 'white'}
            >
                <FastImage
                        isBackground
                        onLoadEnd={onLoadEnd}
                        resizeMode='cover'
                        style = {[styles.feedImageContainer,{height: height}]}
                        imageStyle={styles.feedImage}
                        source = {source}>
                    {this.props.children}            
                </FastImage>
            </TouchableHighlight>

        )
    }
}

const styles = StyleSheet.create({
    feedImage: {
        borderRadius: 10,
        flex: 1,
        backgroundColor: '#f1f1f1',

    },
    feedImageContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-end',
        flex: 1,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
})