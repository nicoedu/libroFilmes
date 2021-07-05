import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, shareReplay } from 'rxjs/operators';
import { IPage, IMovieDetails } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private _url = 'https://api.themoviedb.org/3';
  private api_key = '16a6ed354fac0fd529ce0df314dcc3e9';
  private actualPage = 1;

  constructor(private http: HttpClient) {}

  cache: { [page: string]: Observable<IPage> } = {};

  getPopularMovies(page?: string): Observable<IPage> {
    page
      ? (this.actualPage = Number(page))
      : (page = this.actualPage.toString());

    if (this.cache[page]) {
      return this.cache[page];
    }
    this.cache[page] = this.http
      .get<IPage>(this._url + '/movie/popular', {
        params: { api_key: this.api_key, page: page },
      })
      .pipe(shareReplay(1), catchError(this.handleError));
    return this.cache[page];
  }

  getMovieDetails(id: number): Observable<IMovieDetails> {
    return this.http
      .get<IMovieDetails>(this._url + '/movie/' + id, {
        params: { api_key: this.api_key },
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('error');
  }
}
