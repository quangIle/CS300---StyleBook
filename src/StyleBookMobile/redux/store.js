import { createStore } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { reducer } from "./reducer"

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["modalLoading", "itemDetail", "modalMessage", "modalConfirm"],
}

const persistedReducer = persistReducer(persistConfig, reducer)
export const store = createStore(persistedReducer)
export const persistor = persistStore(store)

export const getStoreValueAt = (key) => {
  return store.getState()[key]
}
