import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './CustomDrawer';
import TabsNavigation from './TabsNavigation';
import StoreScreen from '../views/StoreScreen';
import AddProductScreenScreen from '../views/AddProductScreen';
import AllOrdersScreen from '../views/AllOrders';

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
        drawerActiveTintColor: '#191a2e',
        drawerInactiveTintColor: '#191a2e',
        drawerLabelStyle: {
          marginLeft: -15,
          fontSize: 16,
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
      <Drawer.Screen
        name="Store"
        component={StoreScreen}
        options={{
          drawerIcon: ({color}) => (
            <Entypo
              name="shop"
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
      <Drawer.Screen
        name="Add Product"
        component={AddProductScreenScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons
              name="add-circle"
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
      <Drawer.Screen
        name="All Orders"
        component={AllOrdersScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons
              name="list-circle"
              color={color}
              style={{
                fontSize: 23,
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
