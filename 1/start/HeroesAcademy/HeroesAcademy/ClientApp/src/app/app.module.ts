import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroDetailGuard } from './hero-detail/hero-detail.guard';
import { HeroEditComponent } from './hero-edit/hero-edit.component';
import { HeroDataService } from './hero-list/hero-data.service';
import { HeroListComponent } from './hero-list/hero-list.component';
import { SecretPipe } from './hero-list/secret.pipe';
import { HomeComponent } from './home/home.component';
import { httpInterceptorProviders } from './interceptors';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FistComponent } from './shared/fist/fist.component';

@NgModule({
  declarations: [
    AppComponent,
    FistComponent,
    HeroListComponent,
    HomeComponent,
    NavBarComponent,
    SecretPipe,
    HeroDetailComponent,
    HeroEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(HeroDataService, {
      dataEncapsulation: false,
    }),
    RouterModule.forRoot([
      { path: 'heroesEdit/:id', component: HeroEditComponent },
      { path: 'heroesEdit', component: HeroEditComponent },
      { path: 'heroes', component: HeroListComponent },
      {
        path: 'heroes/:id',
        component: HeroDetailComponent,
        canActivate: [HeroDetailGuard],
      },
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
