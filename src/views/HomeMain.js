import React, {useState} from 'react';
import HomeScreen from './HomeScreen';
import ProductDetail from './ProductDetail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const HomeMain = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      {/* <Stack.Screen name="SearchFilterView" component={SearchFilterView} /> */}
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

export default HomeMain;
