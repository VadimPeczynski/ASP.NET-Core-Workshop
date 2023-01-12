import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroDataService implements InMemoryDbService {
  createDb() {
    const heroes: Hero[] = [
      {
        id: 1,
        name: 'Iron Man',
        team: 'Avengers',
        secretIdentity: 'Tony Stark',
        salary: 0.99,
        description: 'Man with iron suit',
        strength: 4.2,
        logoUrl: 'assets/logos/iron-man.png',
        active: true,
      },
      {
        id: 2,
        name: 'Thor',
        team: 'Avengers',
        secretIdentity: 'Thor Odinson',
        salary: 10.99,
        description: 'Norse god of thunder',
        strength: 4.5,
        logoUrl: 'assets/logos/thor.png',
        active: true,
      },
      {
        id: 3,
        name: 'Superman',
        team: 'Justice League',
        secretIdentity: 'Clark Kent',
        salary: 3500,
        description: 'Man of steel',
        strength: 5.0,
        logoUrl: 'assets/logos/superman.png',
        active: true,
      },
      {
        id: 4,
        name: 'Deadpool',
        team: 'X-men',
        secretIdentity: 'Wade Wilson',
        salary: 15000,
        description: 'Fun to hang out with ... in short doses',
        strength: 3.2,
        logoUrl: 'assets/logos/deadpool.png',
        active: true,
      },
      {
        id: 5,
        name: 'Wonder Woman',
        team: 'Justice League',
        secretIdentity: 'Diana z Themysciry',
        salary: 10000,
        description: 'Amazon warrior',
        strength: 4.4,
        logoUrl: 'assets/logos/wonder-woman.png',
        active: true,
      },
    ];
    return { heroes };
  }
}
