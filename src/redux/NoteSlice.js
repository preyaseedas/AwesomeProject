import {createSlice} from '@reduxjs/toolkit';

const NoteSlice = createSlice({
  name: 'note',
  initialState: {
    notes: [],
    categories: [],
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export default NoteSlice.reducer;

export const {setNotes, setCategories} = NoteSlice.actions;

//Store == Global Store to manage all the reducer and states
//Reducer == what actually need to do
//Action == what need to be dispatched by reducer
//Dispatch == to dispatch the reducer/action/payload
//Selector == to get the state
