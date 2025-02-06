import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../redux/CounterSlice';

const store = configureStore({
  reducer: {
    counterRName: counterReducer,
  },
});

export default store;
