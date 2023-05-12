import { Photo } from "./photo";

export interface Member {
    id: number;
    userName: string;
    photoUrl: string;
    age: number;
    knowAs: null;
    created: Date;
    lastActive: Date;
    gender: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photos: Photo[];
}


