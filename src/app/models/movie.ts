export interface IMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  popularity: number;
  original_language: string;
  release_date: string;
}

export interface IMovieDetails {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  popularity: number;
  original_language: string;
  release_date: string;
  genres: { id: number; name: string }[];
  revenue: number;
  runtime: number;
  imdb_id: string;
}

export interface IPage {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
