import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../hero-list/hero.model';
import { HeroService } from '../hero-list/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  pageTitle = 'Informacje o herosie';
  hero: Hero;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    // @ts-ignore: Object is possibly 'null'.
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe((hero: Hero) => {
      this.hero = hero;
    });
  }

  onClick(): void {
    this.router.navigate(['/heroes']);
  }
}
