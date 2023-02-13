import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Hero } from '../heroes-list/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesApi: string = 'https://localhost:7111/api/heroes';
  constructor(private httpClient: HttpClient) {}
  getHeroes(): Observable<ResponseResult<Hero[]>> {
    return this.httpClient.get<ResponseResult<Hero[]>>(this.heroesApi);
  }

  getHero(id: string | null): Observable<ResponseResult<Hero>> {
    return this.httpClient.get<ResponseResult<Hero>>(this.heroesApi + `/${id}`);
  }

  createHero(hero: Hero): Observable<ResponseResult<Hero>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const newHero = { ...hero, id: 0 };
    return this.httpClient.post<ResponseResult<Hero>>(this.heroesApi, newHero, {
      headers,
    });
  }

  updateHero(hero: Hero): Observable<ResponseResult<Hero>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.heroesApi}/${hero.id}`;
    return this.httpClient.put<ResponseResult<Hero>>(url, hero, { headers });
  }

  deleteHero(id: number): Observable<ResponseResult<number>> {
    const url = `${this.heroesApi}/${id}`;
    return this.httpClient.delete<ResponseResult<number>>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage =
        `Backend returned code ${error.status}, ` +
        `status text was: ${error.statusText}`;
    }
    console.error(error);
    return throwError(() => new Error(errorMessage));
  }
}

export interface ResponseResult<T> {
  data: T;
  errorType: number;
  httpError: number;
  message: string;
}
