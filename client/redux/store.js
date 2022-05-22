import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user';
import fightSlice from './features/fight';

const store = configureStore({
    reducer: {
        user: userReducer,
        nftsSelected: fightSlice,
    }
});

export default store;
