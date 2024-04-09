import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import QuanLyChiTieuScreen from './screens/QuanLyChiTieuScreen'

const App = () => {
  return (
    <Provider store={store}>
        <QuanLyChiTieuScreen/>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  
})