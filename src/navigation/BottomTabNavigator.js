import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../context/ThemeContext';

import HomeScreen from '../screens/main/HomeScreen';
import ServicesScreen from '../screens/main/ServicesScreen';
import HistoryScreen from '../screens/main/HistoryScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {theme} = useTheme();

  const TabBarIcon = ({name, focused, size = 24}) => (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: focused ? theme.colors.primary + '20' : 'transparent',
      transform: [{scale: focused ? 1.1 : 1}],
    }}>
      <Icon
        name={name}
        size={size}
        color={focused ? theme.colors.primary : theme.colors.textSecondary}
      />
    </View>
  );

  const TabBarLabel = ({label, focused}) => (
    <Text style={{
      fontSize: 12,
      fontWeight: focused ? '600' : '400',
      color: focused ? theme.colors.primary : theme.colors.textSecondary,
      marginTop: -5,
    }}>
      {label}
    </Text>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          ...theme.shadows.medium,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => <TabBarLabel label="Home" focused={focused} />,
          tabBarIcon: ({focused}) => (
            <TabBarIcon name="home" focused={focused} />
          ),
        }}
      />
      
      <Tab.Screen
        name="ServicesTab"
        component={ServicesScreen}
        options={{
          tabBarLabel: ({focused}) => <TabBarLabel label="Services" focused={focused} />,
          tabBarIcon: ({focused}) => (
            <TabBarIcon name="grid-view" focused={focused} />
          ),
        }}
      />
      
      <Tab.Screen
        name="HistoryTab"
        component={HistoryScreen}
        options={{
          tabBarLabel: ({focused}) => <TabBarLabel label="History" focused={focused} />,
          tabBarIcon: ({focused}) => (
            <TabBarIcon name="history" focused={focused} />
          ),
        }}
      />
      
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({focused}) => <TabBarLabel label="Profile" focused={focused} />,
          tabBarIcon: ({focused}) => (
            <TabBarIcon name="person" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;