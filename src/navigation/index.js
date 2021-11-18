import React, {useContext} from 'react';
import {Image, TouchableOpacity} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {UserContext} from '../context/UserContext';

const Stack = createNativeStackNavigator();

function RootStackScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function HomeTabsScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconURL;
          if (route.name === 'Home') {
            iconURL = require('../assets/images/home.png');
          } else if (route.name === 'Profile') {
            iconURL = require('../assets/images/profile.png');
          }
          return (
            <Image
              source={iconURL}
              style={{
                height: 24,
                width: 24,
                tintColor: focused ? '#03A9F4' : 'gray',
              }}
            />
          );
        },
      })}>
      <Tab.Screen
        options={{tabBarLabel: 'Home'}}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const {userData} = useContext(UserContext);
  return (
    <NavigationContainer>
      {userData === null ? (
        <RootStackScreen />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Order"
            options={{headerShown: false}}
            component={HomeTabsScreen}
          />
          <Stack.Screen name="Details" component={OrderDetailScreen} />
          <Stack.Screen name="History" component={OrderHistoryScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
