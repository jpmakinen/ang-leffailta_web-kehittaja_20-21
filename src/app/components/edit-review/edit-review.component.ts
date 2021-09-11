// Lähteinä käytetty Angularin/Firebasen docseja ja Tommi Tuikan tutoriaaleja.

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/shared/service/review.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css'],
})
export class EditReviewComponent implements OnInit {
  public editReview!: FormGroup;
  reviewRef: any;

  constructor(
    public reviewService: ReviewService,
    public formBuilder: FormBuilder,
    private activate: ActivatedRoute,
    private router: Router
  ) {
    // alustetaan uusi lomake
    this.editReview = this.formBuilder.group({
      userName: [''],
      movieName: [''],
      releaseDate: [''],
      director: [''],
      starring: [''],
      length: [''],
      ageRating: [''],
      storyline: [''],
      score: [''],
    });
  }

  // hakee vanhan lomakkeen tiedot uuteen lomakkeeseen id perusteella
  ngOnInit(): void {
    const id = this.activate.snapshot.paramMap.get('id');

    this.reviewService.getReviewDoc(id).subscribe((res) => {
      this.reviewRef = res;
      this.editReview = this.formBuilder.group({
        userName: [
          this.reviewRef.userName,
          [Validators.required, Validators.pattern('^[a-zA-Z åäöÅÄÖ0-9-.]+$')],
        ],
        movieName: [
          this.reviewRef.movieName,
          [Validators.required, Validators.pattern('^[a-zA-Z åäöÅÄÖ0-9-.]+$')],
        ],
        releaseDate: [
          this.reviewRef.releaseDate,
          [Validators.pattern('^[0-9]+$')],
        ],
        director: [this.reviewRef.director],
        starring: [this.reviewRef.starring],
        length: [this.reviewRef.length, [Validators.pattern('^[0-9]+$')]],
        ageRating: [this.reviewRef.ageRating, [Validators.pattern('^[0-9]+$')]],
        storyline: [this.reviewRef.storyline],
        score: [
          this.reviewRef.score,
          [
            Validators.required,
            Validators.pattern('^[0-9]+$'),
            Validators.min(0),
            Validators.max(100),
          ],
        ],
      });
    });
  }

  /* 
  tallentaa muutokset kantaan updateReview-metodin avulla alustettuun lomakkeeseen
  tallennuksen yhteydessä ohjautuu takaisin Arkisto-sivulle
  */
  onSubmit() {
    const id = this.activate.snapshot.paramMap.get('id');
    this.reviewService.updateReview(this.editReview.value, id);
    this.router.navigate(['list-review']);
  }
}
