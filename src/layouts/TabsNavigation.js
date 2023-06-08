import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../views/HomeScreen';
import CartScreen from '../views/CartScreen';
import OrderScreen from '../views/OrderScreen';
import ProfileScreen from '../views/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabsNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#b4b4b4',
        tabBarLabelStyle: {},
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 12,
          right: 20,
          left: 20,
          borderRadius: 10,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabelStyle: {
            fontSize: 11,
            marginTop: -15,
            marginBottom: 5,
          },
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Ionicons
              name="home"
              color={color}
              style={{
                marginTop: -10,
                fontSize: 22,
                width: 22,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarLabelStyle: {
            fontSize: 11,
            marginTop: -10,
            marginBottom: 5,
          },
          tabBarLabel: 'Cart',
          tabBarIcon: ({color}) => (
            <Ionicons
              name="ios-cart-sharp"
              color={color}
              style={{
                fontSize: 22,
                width: 22,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          tabBarLabelStyle: {
            fontSize: 11,
            marginTop: -10,
            marginBottom: 5,
          },
          tabBarLabel: 'Orders',
          tabBarIcon: ({color}) => (
            <Entypo
              name="shopping-bag"
              color={color}
              style={{
                fontSize: 22,
                width: 22,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabelStyle: {
            fontSize: 11,
            marginTop: -10,
            marginBottom: 5,
          },
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <FontAwesome
              name="user"
              color={color}
              style={{
                fontSize: 22,
                width: 22,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigation;
