import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="LogIn" component={LoginScreen} />
    </RootStack.Navigator>
);

export default RootStackScreen;