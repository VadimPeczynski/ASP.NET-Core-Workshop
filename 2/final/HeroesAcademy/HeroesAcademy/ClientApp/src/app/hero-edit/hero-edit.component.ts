import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroes-list/hero.model';
import { NgForm } from '@angular/forms';
import { HeroService, ResponseResult } from '../hero/hero.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.css'],
})
export class HeroEditComponent implements OnInit {
  pageTitle = 'Edycja herosa';
  teams = ['Justice League', 'Avengers', 'X-men'];
  type = 'password';
  isPasswordVisible = false;
  hero: Hero = {
    name: '',
    team: '',
    secretIdentity: '',
    salary: 0,
    strength: 0,
    description: '',
    isActive: false,
    logoUrl: '',
  } as Hero;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.heroService
        .getHero(id)
        .subscribe((response: ResponseResult<Hero>) => {
          this.hero = response.data;
        });
    }
  }

  onInfoClick(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.type = this.isPasswordVisible ? 'text' : 'password';
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (!this.hero.id) {
        this.heroService.createHero(this.hero).subscribe(() => {
          this.router.navigate(['/heroes']);
        });
      } else {
        this.heroService.updateHero(this.hero).subscribe(() => {
          this.router.navigate(['/heroes']);
        });
      }
    }
  }

  onCancelClick(): void {
    this.router.navigate(['/heroes']);
  }
}
