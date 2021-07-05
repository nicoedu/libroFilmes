import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { IMovie } from '../../models/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
// TODO Padinação e Menu de filtro
export class MovieListComponent implements OnInit {
  public movies: IMovie[] = [];
  public breakpoint = 4;
  public pageEvent!: PageEvent;
  public totalPages: number = 0;

  constructor(private _movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this._movieService.getPopularMovies().subscribe((data) => {
      this.movies = data.results;
      this.totalPages = data.total_pages;
    });
    this.breakpoint = window.innerWidth <= 600 ? 2 : 4;
  }

  onResize(event: UIEvent) {
    const w = event.target as Window;
    this.breakpoint = w.innerWidth <= 600 ? 2 : 4;
  }

  onSelect(movie: IMovie): void {
    this.router.navigate(['/details', movie.id]);
  }

  onChangePage(event: PageEvent): void {
    this._movieService
      .getPopularMovies((event.pageIndex + 1).toString())
      .subscribe((data) => {
        this.movies = data.results;
      });
  }
}
