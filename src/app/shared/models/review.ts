// luokka, jossa määritellään käyttäjän ominaisuudet
export interface Review {
  id: string;
  userName: string;
  movieName: string;
  releaseDate: number;
  director: string;
  starring: string;
  length: number;
  ageRating: number;
  storyline: string;
  score: number;
}
