// Lähteinä käytetty Angularin/Firebasen docseja ja Tommi Tuikan tutoriaaleja.

import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Review } from 'src/app/shared/models/review';

import { AuthService } from 'src/app/shared/service/auth.service';
import { ImageService } from 'src/app/shared/service/image.service';
import { ReviewService } from 'src/app/shared/service/review.service';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  imageUploads!: any[];
  Reviews!: Review[];

  constructor(
    private imageService: ImageService,
    private reviewService: ReviewService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // haetaan kuvat kannasta, upotetaan kuvat taulukkoon, käytetään Angularin pipe-ominaisuutta avuksi
    this.imageService
      .getImages()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          // store the key
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((imageUploads) => {
        this.imageUploads = imageUploads;
      });

    // haetaan arvioinnit kannasta taulukon avulla
    this.reviewService.getReviewList().subscribe((res) => {
      this.Reviews = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Review;
      });
    });
  }
}
