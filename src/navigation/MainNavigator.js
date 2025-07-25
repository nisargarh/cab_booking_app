import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import DrawerContent from '../components/DrawerContent';
import BottomTabNavigator from './BottomTabNavigator';

// Booking flow screens
import BookingScreen from '../screens/booking/BookingScreen';
import TripDetailsScreen from '../screens/booking/TripDetailsScreen';
import PaymentScreen from '../screens/booking/PaymentScreen';
import RatingScreen from '../screens/booking/RatingScreen';

// Other screens
import WalletScreen from '../screens/WalletScreen';
import OffersScreen from '../screens/OffersScreen';
import SupportScreen from '../screens/SupportScreen';
import ReferEarnScreen from '../screens/ReferEarnScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Rating" component={RatingScreen} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          width: '80%',
        },
        swipeEnabled: true,
        swipeEdgeWidth: 50,
      }}>
      <Drawer.Screen name="Home" component={MainStackNavigator} />
      <Drawer.Screen name="YourRides" component={MainStackNavigator} />
      <Drawer.Screen name="Wallet" component={WalletScreen} />
      <Drawer.Screen name="Offers" component={OffersScreen} />
      <Drawer.Screen name="Support" component={SupportScreen} />
      <Drawer.Screen name="ReferEarn" component={ReferEarnScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;