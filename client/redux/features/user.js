import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: { value: {
        wallet: "",
        nftsOwn: 0
    } },
    reducers: {
        setConnectWallet: (state, action) => {
            state.value = action.payload;
        }
    }

});

export const { setConnectWallet } = userSlice.actions;

export default userSlice.reducer;