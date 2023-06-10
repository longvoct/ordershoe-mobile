import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/views/LoginScreen';
import AddProductScreen from './src/views/AddProductScreen';
import GetStartedScreen from './src/views/GetStartedScreen';
import DrawerNavigation from './src/layouts/DrawerNavigation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
