export interface Developer {
    id: number;
    name: string;
    country: string;
    founded: number;
    website: string;
    imageUrl: string;
  }
  
  export interface Game {
    id: number;
    name: string;
    description: string;
    price: number;
    isAvailable: boolean;
    releaseDate: string;
    imageUrl: string;
    category: string;
    genres: string[];
    developer: Developer;
  }
  