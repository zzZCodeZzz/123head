import {createAsyncThunk, SerializedError} from "@reduxjs/toolkit";
import {FirestoreTournament, Player, Tournament} from "./types";
import {getTournamentsCollection} from "./firestore/collections";
import firebase from "firebase";

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

export const joinTournamentThunk = createAsyncThunk<{ tournamentId: string, player: Player }, { tournamentId: string, player: Player }>(
    "tournament/join",
    async ({tournamentId, player}) => {
        await getTournamentsCollection()
            .doc(tournamentId)
            .update({
                id: tournamentId,
                players: firebase.firestore.FieldValue.arrayUnion(player)
            })
        return {tournamentId, player};
    }
);

export const listTournamentsThunk = createAsyncThunk(
    "tournaments/list",
    async () => {
        const results = await getTournamentsCollection().get();
        return results.docs.map((d) => {
            return d.data()
        });
    }
);

export const getTournamentThunk = createAsyncThunk<Tournament, string>(
    "tournament/get",
    async (id) => {
        const result = await getTournamentsCollection().doc(id).get();
        const tournament = result.data();
        if (!tournament) {
            // eslint-disable-next-line no-throw-literal
            throw {
                name: "not found",
                message: "tournament with id " + id + " not found"
            } as SerializedError;
        }
        return tournament;
    }
);
