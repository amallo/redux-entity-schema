/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import ProgramMenu from "./components/ProgramMenu"

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import store from "./store"
import { Provider } from 'react-redux'

const MainNavigator = createStackNavigator({
    Home: { screen: ProgramMenu },
});

const AppWithNavigation = createAppContainer(MainNavigator);

const App = (props) => {
    return (
        <Provider store={store}>
            <AppWithNavigation />
        </Provider >
    )
}



export default App;
