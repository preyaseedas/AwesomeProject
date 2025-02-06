import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {decreaseCounter, increaseCounter, reset} from '../redux/CounterSlice';
import {useNavigation} from '@react-navigation/native';

const VariableCounterScreen = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counterRName.counterVar);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Count: {count}</Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          console.log('hhhh');
          dispatch(increaseCounter());
        }}>
        <Text style={{color: 'white'}}>Increment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          dispatch(decreaseCounter());
        }}>
        <Text style={{color: 'white'}}>Decrement</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          dispatch(reset());
        }}>
        <Text style={{color: 'white'}}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate('Counter2');
        }}>
        <Text style={{color: 'white'}}>GO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 32,
    marginBottom: 20,
  },
  buttonStyle: {
    marginBottom: 20,
    backgroundColor: 'blue',
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default VariableCounterScreen;
