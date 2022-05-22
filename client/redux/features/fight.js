import { createSlice } from '@reduxjs/toolkit';

export const fightSlice = createSlice({
    name: "nftsSelected",
    initialState: { value: {
        bossSelectedId: 0,
        characterSelectedId: 0,

    } },
    reducers: {
        setNftsSelected: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setNftsSelected } = fightSlice.actions;

export default fightSlice.reducer;