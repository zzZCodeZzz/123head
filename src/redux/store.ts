import {configureStore} from "@reduxjs/toolkit";
import tournamentsSlice from "../admin/tournaments/redux/tournaments.slice";

export const store = configureStore({
    reducer: {
        tournaments: tournamentsSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
