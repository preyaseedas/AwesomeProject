import {createSlice} from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    counterVar: 0,
  },
  reducers: {
    increaseCounter: state => {
      console.log('I counterVar =', state.counterVar);
      state.counterVar = state.counterVar + 1;
      console.log('III counterVar =', state.counterVar);
    },
    decreaseCounter: state => {
      console.log('D counterVar =', state.counterVar);
      state.counterVar = state.counterVar - 1;
      console.log('DDD counterVar =', state.counterVar);
    },
    reset: state => {
      console.log('R counterVar =', state.counterVar);
      state.counterVar = 0;
    },
  },
});

export const {increaseCounter, decreaseCounter, reset} = counterSlice.actions;
export default counterSlice.reducer;
