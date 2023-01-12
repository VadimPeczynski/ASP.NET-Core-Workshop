import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Hero } from './hero.model';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(private http: HttpClient) {}

  getTeams(): Observable<string[]> {
    return of(['Avengers', 'Justice League', 'X-Men']);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((data) => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(this.heroesUrl + '/' + id).pipe(
      tap((data) => console.log('Hero: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createHero(hero: Hero) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const newHero = { ...hero, id: null };
    return this.http
      .post<Hero>(this.heroesUrl, newHero, { headers })
      .pipe(tap((data) => console.log('createHero: ' + JSON.stringify(data))));
  }

  updateHero(hero: Hero) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put<Hero>(url, hero, { headers }).pipe(
      tap(() => console.log('updateHero: ' + hero.id)),
      map(() => hero)
    );
  }

  deleteHero(id: number): Observable<{}> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
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
    return throwError(errorMessage);
  }
}
