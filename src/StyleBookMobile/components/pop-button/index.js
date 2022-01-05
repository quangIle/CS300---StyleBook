import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import Animated, { useValue } from "react-native-reanimated";

const colorCodes = [
  { background: "#1B9A00", foreground: "#59CB01", fontColor: "#FFFFFF" }, //Duolingo
  { background: "#95A5A6", foreground: "#dfe6e9", fontColor: "#7F8C8D" }, //White
  { background: "#E67E22", foreground: "#F1C40F", fontColor: "#FFFFFF" }, //Golden
  {
    background: "transparent",
    foreground: "transparent",
    fontColor: "#95A5A6",
  }, //clear
  { background: "#c0392b", foreground: "#e74c3c", fontColor: "#ecf0f1" }, //red
];

const PopButton = (props) => {
  const isClick = useValue(45);
  const { colorIndex, onPress, style } = props;
  return (
    <View
      style={[
        {
          alignItems: "stretch",
          margin: 5,
          height: 45,
        },
        style,
      ]}
    >
      {colorCodes[colorIndex].background == "transparent" &&
      colorCodes[colorIndex].foreground == "transparent" ? (
        <View
          style={{
            width: "100%",
            height: 45,
            borderRadius: 16,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={onPress}>
            <Text
              style={{
                color: colorCodes[colorIndex].fontColor,
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
                fontFamily: "SF Pro Display Bold",
              }}
            >
              {props.text}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View
            style={{
              backgroundColor: colorCodes[colorIndex].background,
              borderRadius: 16,
              height: 50,
              ...StyleSheet.absoluteFillObject,
            }}
          />
          <TouchableHighlight
            style={{ borderRadius: 16 }}
            onPressIn={() => isClick.setValue(50)}
            onPressOut={() => isClick.setValue(45)}
            onPress={onPress}
            underlayColor={"rbga(0,0,0,0.5)"}
          >
            <Animated.View
              style={{
                backgroundColor: colorCodes[colorIndex].foreground,
                width: "100%",
                height: isClick,
                borderRadius: 16,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colorCodes[colorIndex].fontColor,
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                  fontFamily: "SF Pro Display Bold",
                }}
              >
                {props.text}
              </Text>
            </Animated.View>
          </TouchableHighlight>
        </>
      )}
    </View>
  );
};

export default PopButton;
