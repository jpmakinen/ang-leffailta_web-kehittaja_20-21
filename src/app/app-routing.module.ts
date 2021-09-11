import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from './components/movie/movie.component';
import { ReviewComponent } from './components/review/review.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListReviewComponent } from './components/list-review/list-review.component';
import { EditReviewComponent } from './components/edit-review/edit-review.component';

import { AuthGuard } from './shared/guard/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/movie', pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'review', component: ReviewComponent, canActivate: [AuthGuard] },
  {
    path: 'movie',
    component: MovieComponent,
  },
  {
    path: 'navbar',
    component: NavbarComponent,
  },
  {
    path: 'list-review',
    component: ListReviewComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'edit-review/:id',
    component: EditReviewComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
