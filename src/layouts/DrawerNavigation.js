import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomDrawer from './CustomDrawer';
import TabsNavigation from './TabsNavigation';
import HomeScreen from '../views/HomeScreen';
import {View, Text, TextInput, Button, Image, StyleSheet} from 'react-native';

const Drawer = createDrawerNavigator();

function DrawerNavigation({navigation}) {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          width: 320,
        },
        headerShown: false,
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#000',
        drawerLabelStyle: {
          marginLeft: -15,
          fontSize: 16,
          fontFamily: 'Inter-Medium',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={TabsNavigation}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesome
              name="dashboard"
              color={color}
              style={{
                fontSize: 22,
                top: 2,
                left: 0,
                width: 22,
                height: 30,
              }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
export default DrawerNavigation;
