import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    name: "",
    email: "",
    points: 0,
  },
  reducers: {
    updateUsername: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addPoints: (state, action: PayloadAction<number>) => {
      state.points += action.payload;
    },
    removePoints: (state, action: PayloadAction<number>) => {
      if (state.points > 0 && state.points >= action.payload) {
      state.points -= action.payload;
      }
    },    
  },
});

export const { updateUsername, addPoints, removePoints } = profileSlice.actions;
export default profileSlice.reducer;
