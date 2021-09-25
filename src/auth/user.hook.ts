import React from "react";
import firebase from "firebase";

export function useCurrentUser() {
    const [user, serUser] = React.useState<firebase.User | null>(null);

    React.useEffect(() => {
        return firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                serUser(user)
            }
        })
    }, [])

    return user;
}
