import React, {useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from 'pages/Home';
import Settings from 'pages/Settings';
import Header from 'components/Header';
import SongsContext, {initialState} from 'context/songs';
import songReducer from 'react-reducer/songs';

const Tab = createBottomTabNavigator();

const App = () => {
  const [state, dispatch] = useReducer(songReducer, initialState);
  return (
    <SongsContext.Provider value={{state, dispatch}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            header: () => <Header />,
            tabBarStyle: {paddingTop: 10, paddingBottom: 10, height: 65},
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Cá nhân',
              tabBarLabelStyle: {},
              tabBarIcon: ({color}) => (
                <Icon
                  name="ios-musical-notes-outline"
                  size={20}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({color}) => (
                <Icon name="settings-outline" size={20} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SongsContext.Provider>
  );
};

export default App;
