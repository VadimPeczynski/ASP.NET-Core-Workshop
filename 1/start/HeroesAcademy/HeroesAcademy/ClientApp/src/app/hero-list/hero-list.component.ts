import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero.model';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {
  pageTitle: string = 'Lista Herosów';
  showLogo: boolean = false;
  showAlert = false;
  alertText = '';
  filteredHeroes: Hero[] = [];
  heroes: Hero[] = [];

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredHeroes = this.listFilter
      ? this.filterHeroes(this.listFilter)
      : this.heroes;
  }

  constructor(private heroService: HeroService, private router:Router) {}

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe((heroes: Hero[]) => {
      this.heroes = heroes;
      this.filteredHeroes = this.heroes;
    });
  }

  toggleLogo(): void {
    this.showLogo = !this.showLogo;
  }

  filterHeroes(filterBy: string): Hero[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.heroes.filter((hero: Hero) => {
      return hero.name.toLocaleLowerCase().indexOf(filterBy) !== -1;
    });
  }

  onRatingClick(text: string): void {
    this.showAlert = true;
    this.alertText = text;
  }

  addHero():void{
    this.router.navigate(['/heroesEdit']);
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
