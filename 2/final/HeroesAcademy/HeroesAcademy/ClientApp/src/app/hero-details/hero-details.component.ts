import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService, ResponseResult } from '../hero/hero.service';
import { Hero } from '../heroes-list/hero.model';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css'],
})
export class HeroDetailsComponent implements OnInit {
  pageTitle = 'Informacje o herosie';
  hero: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.heroService.getHero(id).subscribe((hero: ResponseResult<Hero>) => {
      this.hero = hero.data;
    });
  }

  onClick(): void {
    this.router.navigate(['/heroes']);
  }
}
