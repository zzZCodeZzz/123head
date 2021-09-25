import firebase from "firebase";
import {FirestoreTournament, Tournament} from "../types";

export const tournamentDataConverter: firebase.firestore.FirestoreDataConverter<Tournament> = {
    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Tournament {
        const snapshotData = snapshot.data() as FirestoreTournament;
        return {
            id: snapshot.id,
            name: snapshotData.name,
            description: snapshotData.description,
            date: snapshotData.date,
            players: snapshotData.players
        }
    },
    toFirestore({id, ...modelObject}: Tournament): firebase.firestore.DocumentData {
        return modelObject;
    }
};
