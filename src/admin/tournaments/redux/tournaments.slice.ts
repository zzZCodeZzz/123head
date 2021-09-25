import {createEntityAdapter, createSlice, isAnyOf, SerializedError} from "@reduxjs/toolkit";
import {Tournament} from "./types";
import {
    createTournamentThunk,
    getTournamentThunk, joinTournamentThunk,
    listTournamentsThunk,
    updateTournamentThunk
} from "./tournaments.thunk";
import {RootState} from "../../../redux/store";

interface EnhancedState {
    loading: boolean;
    error: SerializedError | null;
}

const initialEnhancedState: EnhancedState = {
    loading: false,
    error: null
}

const tournamentsAdapter = createEntityAdapter<Tournament>();

const tournamentsSlice = createSlice({
    name: "tournaments",
    initialState: tournamentsAdapter.getInitialState(initialEnhancedState),
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(joinTournamentThunk.fulfilled, (state, {payload}) => {
                state.loading = false;
                const oldTournament = state.entities[payload.tournamentId];
                if(oldTournament) {
                    tournamentsAdapter.updateOne(state, {
                        id: payload.tournamentId,
                        changes: { players: [...oldTournament.players, payload.player]}
                    })
                }
            })
            .addCase(listTournamentsThunk.fulfilled, (state, {payload}) => {
                state.loading = false;
                tournamentsAdapter.upsertMany(state, payload);
            })
            .addMatcher(isAnyOf(
                getTournamentThunk.fulfilled,
                updateTournamentThunk.fulfilled,
                createTournamentThunk.fulfilled
            ), (state, {payload}) => {
                state.loading = false;
                tournamentsAdapter.upsertOne(state, payload);
            })
            .addMatcher(isAnyOf(
                listTournamentsThunk.pending,
                createTournamentThunk.pending,
                updateTournamentThunk.pending,
                getTournamentThunk.pending
            ), (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(isAnyOf(
                listTournamentsThunk.rejected,
                createTournamentThunk.rejected,
                updateTournamentThunk.rejected,
                getTournamentThunk.rejected
            ), (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
});

export const {
    selectById: selectTournamentById,
    selectIds: selectTournamentIds,
    selectEntities: selectTournamentEntities,
    selectAll: selectAllTournaments,
    selectTotal: selectTotalTournaments,
} = tournamentsAdapter.getSelectors((state: RootState) => state.tournaments);

export default tournamentsSlice.reducer;
