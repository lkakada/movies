import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service';
import { Movie } from '../../models';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private readonly movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }
  getMovies() {
    this.movieService.getMovies()
      .subscribe(movies => {
        this.movies = movies;
        this.averageRating();
      })
  }

  averageRating() {
    let movie = this.movies;
    let newMovie = [];
    let rating;
    var i;
    for (i of movie) {
      let rating = 0;
      for (let x of i.reviews) {
        rating += x['star'];
      }
      let aveR = rating / i.reviews.length
      rating = Math.ceil(aveR * 10) / 10;
      i['rating'] = rating;
      newMovie.push(i);
    }
    this.movies = newMovie;
  }
}
