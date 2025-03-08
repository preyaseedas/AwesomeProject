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
    addNote: (state, action) => {
      state.notes = state.notes.concat(action.payload);
    },
    updateNote: (state, action) => {
      state.notes = state.notes.map(item =>
        item._id === action.payload._id ? action.payload : item,
      );
    },
    deleteNotes: (state, action) => {
      console.log('payload', action.payload);
      state.notes = state.notes.filter(
        note => !action.payload.includes(note._id),
      );
    },
  },
});

export default NoteSlice.reducer;

export const {setNotes, setCategories, addNote, updateNote, deleteNotes} =
  NoteSlice.actions;

//Store == Global Store to manage all the reducer and states
//Reducer == what actually need to do
//Action == what need to be dispatched by reducer
//Dispatch == to dispatch the reducer/action/payload
//Selector == to get the state
