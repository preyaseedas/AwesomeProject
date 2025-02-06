import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {decreaseCounter, increaseCounter, reset} from '../redux/CounterSlice';
import {useNavigation} from '@react-navigation/native';

const VariableCounterScreen2 = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const count = useSelector(state => state.counterRName.counterVar);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Count2: {count}</Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          console.log('hhhh');
          dispatch(increaseCounter());
        }}>
        <Text style={{color: 'white'}}>Increment2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          dispatch(decreaseCounter());
        }}>
        <Text style={{color: 'white'}}>Decrement2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          dispatch(reset());
        }}>
        <Text style={{color: 'white'}}>Reset2</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={{color: 'white'}}>GO Back</Text>
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

export default VariableCounterScreen2;
