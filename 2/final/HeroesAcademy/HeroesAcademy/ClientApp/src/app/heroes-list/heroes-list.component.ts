import { Component, OnInit } from '@angular/core';
import { HeroService, ResponseResult } from '../hero/hero.service';
import { Hero } from './hero.model';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit {
  showImage: boolean = false;
  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];

  private _listFilter: string = '';
  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(v: string) {
    this._listFilter = v;
    this.filteredHeroes = this.listFilter
      ? this.filterHeroes(this.listFilter)
      : this.heroes;
  }

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe((heroes: ResponseResult<Hero[]>) => {
      this.heroes = heroes.data;
      this.filteredHeroes = this.heroes;
    });
  }

  onClick(): void {
    this.showImage = !this.showImage;
  }

  onNotify(message: string): void {
    console.log(message);
  }

  filterHeroes(listFilter: string): Hero[] {
    listFilter = listFilter.toLocaleLowerCase();
    return this.heroes.filter((hero: Hero) => {
      return hero.name.toLocaleLowerCase().indexOf(listFilter) !== -1;
    });
  }

  deleteHero(hero: Hero): void {
    if (hero && hero.id) {
      if (confirm(`Czy chcesz usunąć bohatera: ${hero.name}?`)) {
        this.heroService.deleteHero(hero.id).subscribe(() => {
          const foundIndex = this.heroes.findIndex(
            (item) => item.id === hero.id
          );
          if (foundIndex > -1) {
            this.heroes.splice(foundIndex, 1);
          }
          this.filteredHeroes = this.heroes;
        });
      }
    }
  }
}
