import React from 'react';
import {StyleSheet, View} from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import AddEditNote from './src/screens/AddEditNote';

import Reminder from './src/screens/Reminder.js';
import Card from './src/screens/Card.js';
import {Provider} from 'react-redux';
import store from './src/redux/Store.js';
import VariableCounterScreen from './src/screens/VariableCounterScreen.js';
import VariableCounterScreen2 from './src/screens/VariableCounterScreen2.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />

          <Stack.Screen name="Home" component={HomeScreen} />

          <Stack.Screen name="AddNote" component={AddEditNote} />
          <Stack.Screen name="Remind" component={Reminder} />

          <Stack.Screen name="Counter" component={VariableCounterScreen} />
          <Stack.Screen name="Counter2" component={VariableCounterScreen2} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  form: {
    height: 500,
    width: 300,
    margin: 10,
    alignItems: 'center',
  },
  color: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
  },
  TextInput: {
    fontSize: 18,
    color: 'blue',
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
  },
});

export default App;
