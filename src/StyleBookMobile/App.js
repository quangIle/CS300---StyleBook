import React from "react"
import * as Font from "expo-font"

import { Provider } from "react-redux"
import { store, persistor } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"
import NavigationScreen from "./screens/navigation"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resourceLoaded: false,
    }
  }

  async LoadResource() {
    await Font.loadAsync({
      "SF Pro Display Bold": {
        uri: require("./assets/fonts/SF-Pro-Display-Bold.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "SF Pro Display Heavy": {
        uri: require("./assets/fonts/SF-Pro-Display-Heavy.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "SF Pro Display Regular": {
        uri: require("./assets/fonts/SF-Pro-Display-Regular.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "SF Pro Display Semibold": {
        uri: require("./assets/fonts/SF-Pro-Display-Semibold.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    })
    this.setState({ resourceLoaded: true })
  }

  componentDidMount() {
    this.LoadResource()
  }
  render() {
    if (this.state.resourceLoaded)
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationScreen />
          </PersistGate>
        </Provider>
      )
    else return null
  }
}
