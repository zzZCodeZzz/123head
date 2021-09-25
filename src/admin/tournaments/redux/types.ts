export interface Tournament {
    id: string;
    name: string;
    description?: string;
    date: number;
    players: Player[];
}

export interface Player {
    userId: string;
    displayName: string;
}

export interface FirestoreTournament extends Omit<Tournament, "id"> {}
