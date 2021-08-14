import {createAsyncThunk, SerializedError} from "@reduxjs/toolkit";
import {FirestoreTournament, Tournament} from "./types";
import {getTournamentsCollection} from "./firestore/collections";

export const createTournamentThunk = createAsyncThunk<Tournament, FirestoreTournament>(
    "tournaments/create",
    async (dto) => {
        const result = await getTournamentsCollection().add({id: "new", ...dto});

        return ({
            id: result.id,
            ...dto
        })
    }
);

export const updateTournamentThunk = createAsyncThunk<Tournament, { id: string, changes: FirestoreTournament }>(
    "tournament/update",
    async ({id, changes}) => {
        await getTournamentsCollection().doc(id).update(changes);
        return {
            id,
            ...changes
        }
    }
);

export const listTournamentsThunk = createAsyncThunk(
    "tournaments/list",
    async () => {
        const results = await getTournamentsCollection().get();
        return results.docs.map((d) => d.data());
    }
);

export const getTournamentThunk = createAsyncThunk<Tournament, string>(
    "tournament/get",
    async (id) => {
        const result = await getTournamentsCollection().doc().get();
        const tournament = result.data();
        if(!tournament) {
            throw {
                name: "not found",
                message: "tournament with id " + id + " not found"
            } as SerializedError;
        }
        return tournament;
    }
)
