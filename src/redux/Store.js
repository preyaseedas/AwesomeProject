import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../redux/CounterSlice';
import noteSlice from '../redux/NoteSlice';

const store = configureStore({
  reducer: {
    counterRName: counterReducer,
    noteReducer: noteSlice,
  },
});

export default store;
