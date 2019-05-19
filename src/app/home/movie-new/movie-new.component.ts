import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Movie } from '../../models';
import { MovieService } from '../../service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-movie-new',
  templateUrl: './movie-new.component.html',
  styleUrls: ['./movie-new.component.css']
})
export class MovieNewComponent implements OnInit {
  movie = {} as Movie;
  errors: string[] = [];
  constructor(
    private readonly movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.movie = { reviews: { name: '', star: 1, content: '' } } as Movie;
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    console.log(this.movie)
    this.movieService.postMovie(this.movie)
      .subscribe(newMovie => {
        console.log("new movie", newMovie);
        this.router.navigateByUrl('/movies');
      },
        error => {
          this.handleErrors(error.error)
        })
  }
  private handleErrors(errors: string[] | string) {
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
}
