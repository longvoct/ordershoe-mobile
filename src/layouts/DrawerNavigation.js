import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomDrawer from './CustomDrawer';
import TabsNavigation from './TabsNavigation';
import MenScreen from '../views/MenScreen';
import WomenScreen from '../views/WomenScreen';
import KidsScreen from '../views/KidsScreen';
import StoreScreen from '../views/StoreScreen';

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
      <Drawer.Screen
        name="Men"
        component={MenScreen}
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
        name="Women"
        component={WomenScreen}
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
        drawerLabelStyle={{fontFamily: 'Poppins-SemiBold', color: 'red'}}
        drawerStyle={{fontFamily: 'Poppins-SemiBold', color: 'red'}}
        name="Kids"
        component={KidsScreen}
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
