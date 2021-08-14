import firebase from "firebase";
import {tournamentDataConverter} from "./firestoreConverters";

export const getTournamentsCollection = () => firebase.firestore()
    .collection("tournaments")
    .withConverter(tournamentDataConverter);
