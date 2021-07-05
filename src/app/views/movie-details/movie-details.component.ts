import {
  BrowserModule,
  DomSanitizer,
  SafeStyle,
} from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie, IMovieDetails } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  public selectedMovie: IMovieDetails | undefined;
  public movieBackground: string = '';
  public moviePoster: string = '';
  constructor(
    private _movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    this._movieService
      .getMovieDetails(parseInt(id || '-1'))
      .subscribe((data) => {
        this.selectedMovie = { ...data };
        this.movieBackground =
          'https://image.tmdb.org/t/p/original' +
          this.selectedMovie?.backdrop_path;
        this.moviePoster =
          'https://image.tmdb.org/t/p/w500' + this.selectedMovie?.poster_path;
      });
  }

  returnToHome(): void {
    this.router.navigate(['/']);
  }
}
