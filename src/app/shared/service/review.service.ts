// lähteenä Angular-docs

import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private reviewsdb: AngularFirestore) {}

  // luodaan arvostelu
  createReview(review: Review) {
    return new Promise<any>((resolve, reject) => {
      this.reviewsdb
        .collection('movieReviews')
        .add(review)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }

  // haetaan arvostelu
  getReviewDoc(id: any) {
    return this.reviewsdb.collection('movieReviews').doc(id).valueChanges();
  }

  // haetaan arvostelut
  getReviewList() {
    return this.reviewsdb.collection('movieReviews').snapshotChanges();
  }

  // muokataan/päivitetään arvostelut
  updateReview(review: Review, id: any) {
    return this.reviewsdb.collection('movieReviews').doc(id).update({
      userName: review.userName,
      movieName: review.movieName,
      releaseDate: review.releaseDate ,
      director: review.director,
      starring: review.starring,
      length: review.length,
      ageRating: review.ageRating,
      storyline: review.storyline,
      score: review.score,
    });
  }

  // poistetaan arvostelu
  deleteReview(review: Review) {
    return this.reviewsdb.collection('movieReviews').doc(review.id).delete();
  }
}
