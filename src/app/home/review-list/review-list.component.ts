import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Movie, Review } from '../../models';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  movie = {} as Movie;
  constructor(
    private readonly movieService: MovieService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.getReview();
  }
  getReview() {
    this.route.paramMap
      .pipe(
        map(params => params.get('movie_id')),
        switchMap(id => this.movieService.getReviews(id))
      )
      .subscribe(movie => {
        this.movie = movie;
        console.log('Restaurant', this.movie);
      })
  }

  deleteMovie(movie: Movie) {
    this.movieService.deleteMovie(movie._id)
      .subscribe(removedMovie => {
        console.log('Removed movie', removedMovie);
        this.router.navigateByUrl('/movies')
      })
  }

  deleteReview(review: Review) {
    this.movieService.deleteReview(review._id)
      .subscribe(removedReview => {
        console.log("Removed review", removedReview);
        this.getReview();
      })
  }
}
