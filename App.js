import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SplashScreen from './src/screens/splashScreen/SplashScreen';
import GetStartedScreen from './src/screens/getStarted/GetStartedScreen';
import { StatusBar } from 'react-native';
import HomeScreen from './src/screens/homeScreen/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ServicesScreen from './src/screens/servicesScreen/ServicesScreen';
import ActivityScreen from './src/screens/activityScreen/ActivityScreen';
import AccountScreen from './src/screens/accountScreen/AccountScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapScreen from './src/screens/mapScreen/MapScreen';

const App = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const HomeTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: 11,
            fontFamily: 'Raleway-Bold',
          },
          tabBarStyle: {
            paddingBottom: 10,
            paddingTop: 5,
            height: 70,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName = '';

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Services':
                iconName = 'grid-view';
                break;
              case 'Activity':
                iconName = 'speaker-notes';
                break;
              case 'Account':
                iconName = 'supervisor-account';
                break;
            }

            return <MaterialIcons name={iconName} size={28} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Uber',
            headerTitleStyle: {
              fontSize: 35,
              fontFamily: 'Raleway-Bold',
              marginTop: -10,
            },
            headerStyle: {
              height: 80,
              elevation: 0,
            },
          }}
        />
        <Tab.Screen
          name="Services"
          component={ServicesScreen}
          options={{
            headerTitleStyle: {
              fontSize: 35,
              fontFamily: 'Raleway-Bold',
              marginTop: -10,
            },
            headerStyle: {
              height: 80,
              elevation: 0,
            },
          }}
        />
        <Tab.Screen
          name="Activity"
          component={ActivityScreen}
          options={{
            headerTitleStyle: {
              fontSize: 35,
              fontFamily: 'Raleway-Bold',
              marginTop: -10,
            },
            headerStyle: {
              height: 80,
              elevation: 0,
            },
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            headerTitleStyle: {
              fontSize: 35,
              fontFamily: 'Raleway-Bold',
              marginTop: -10,
            },
            headerStyle: {
              height: 80,
              elevation: 0,
            },
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="MainTabs" component={HomeTabs} />
        <Stack.Screen name="Maps" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
