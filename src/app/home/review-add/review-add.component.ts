import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Review, Movie } from '../../models';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.css']
})
export class ReviewAddComponent implements OnInit {
  review = new Review();
  movie = {} as Movie;
  errors: string[] = [];
  constructor(
    private readonly movieService: MovieService,
    private router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.paramMap
      .pipe(
        map(params => params.get('movie_id')),
        switchMap(id => this.movieService.showMovie(id))
      )
      .subscribe(movie => {
        this.movie = movie
        console.log('Movie', this.movie);
      })
  }
  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    this.movieService.addReview(this.movie._id, this.review)
      .subscribe(newReview => {
        console.log("new review", newReview)
        this.router.navigate(['/movies', this.movie._id])
      },
        error => {
          this.handleErrors(error.error);
        })
    form.reset();
  }
  private handleErrors(errors: string[] | string) {
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
} 
