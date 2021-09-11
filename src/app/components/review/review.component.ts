// Lähteinä käytetty Angularin/Firebasen docseja ja Tommi Tuikan tutoriaaleja.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/shared/service/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  public reviewForm: FormGroup;

  constructor(
    public reviewService: ReviewService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    // luodaan lomakkeen datakentät, alustetaan validointi
    this.reviewForm = this.formBuilder.group({
      userName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z åäöÅÄÖ0-9-.]+$')],
      ],

      movieName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z åäöÅÄÖ0-9-.]+$')],
      ],
      releaseDate: ['', [Validators.pattern('^[0-9]+$')]],
      director: [''],
      starring: [''],
      length: ['', [Validators.pattern('^[0-9]+$')]],
      ageRating: ['', [Validators.pattern('^[0-9]+$')]],
      storyline: [''],
      score: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.min(0),
          Validators.max(100),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  /*
  Tallennetaan lomake annetuilla tiedoilla kantaan käyttäen 
  createReview-metodia.
  */
  onSubmit() {
    this.reviewService.createReview(this.reviewForm.value);
    this.router.navigate(['list-review']);
  }
}
