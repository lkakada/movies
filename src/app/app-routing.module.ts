import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieListComponent } from './home/movie-list/movie-list.component';
import { MovieNewComponent } from './home/movie-new/movie-new.component';
import { ReviewListComponent } from './home/review-list/review-list.component';
import { ReviewAddComponent } from './home/review-add/review-add.component';


const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'movies', component: MovieListComponent },
      { path: 'movies/new', component: MovieNewComponent },
      { path: 'movies/:movie_id', component: ReviewListComponent },
      { path: 'movies/:movie_id/review', component: ReviewAddComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
