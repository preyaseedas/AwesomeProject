import React from 'react';
import {StyleSheet, View} from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import AddEditNote from './src/screens/AddEditNote';
import WorkPage from './src/screens/workPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
    
     
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddNote" component={AddEditNote} />
      </Stack.Navigator>
    </NavigationContainer>
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
