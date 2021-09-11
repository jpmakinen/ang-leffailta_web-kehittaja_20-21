/*
Lähdemateriaalina Firebase-docs.
*/

import { Component, OnInit,} from '@angular/core';
import { Review } from 'src/app/shared/models/review';
import { ReviewService } from 'src/app/shared/service/review.service';

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.css'],
 })
export class ListReviewComponent implements OnInit {
  Reviews!: Review[];

  constructor(private reviewService: ReviewService) {}

  // haetaan arvostelut kannasta taulukon avulla
  ngOnInit(): void {
    this.reviewService.getReviewList().subscribe((res) => {
      this.Reviews = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Review;
      });
    });
  }

  // poistaa arvostelun tietokannasta
  removeReview = (review: Review) => this.reviewService.deleteReview(review);
}
