import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AppNavigator from './navigation/AppNavigator';
import {ThemeProvider} from './context/ThemeContext';
import {AuthProvider} from './context/AuthContext';
import {LocationProvider} from './context/LocationContext';
import {BookingProvider} from './context/BookingContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <LocationProvider>
              <BookingProvider>
                <PaperProvider>
                  <NavigationContainer>
                    <StatusBar
                      barStyle="dark-content"
                      backgroundColor="transparent"
                      translucent
                    />
                    <AppNavigator />
                  </NavigationContainer>
                </PaperProvider>
              </BookingProvider>
            </LocationProvider>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;