export interface Tournament {
    id: string;
    name: string;
    description?: string;
    date: number;
}

export interface FirestoreTournament extends Omit<Tournament, "id"> {}
