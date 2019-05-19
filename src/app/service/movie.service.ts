import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models';
import { Review } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly base = '/api/movie';
  constructor(private readonly http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.base);
  }
  postMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.base}`, movie);
  }
  showMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.base}/${id}`);
  }
  deleteMovie(id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${this.base}/${id}`);
  }

  getReviews(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.base}/review/${id}`)
  }
  addReview(id: string, review: Review) {
    return this.http.post(`${this.base}/review/${id}`, review);
  }
  deleteReview(id: string) {
    return this.http.delete(`${this.base}/review/${id}`)
  }
}
