import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {SignUp, Login} from '../screens/index';
const { Navigator, Screen } = createStackNavigator();

const AuthStack = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name='signup' component={SignUp} />
      <Screen name='login' component={Login} />
    </Navigator>
  )
}

export default AuthStack;
