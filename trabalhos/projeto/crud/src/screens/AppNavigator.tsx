import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/HomeScreen';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
    return (
        <Drawer.Navigator initialRouteName = "Home">
            <Drawer.Screen name = "Home" component = {HomeScreen} />
            <Drawer.Screen name = "Tela 1" component = {Screen1} />
            <Drawer.Screen name = "Tela 2" component = {Screen2} />
        </Drawer.Navigator>    
    );
}