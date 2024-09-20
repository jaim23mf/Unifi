import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { AuthGuard } from './components/auth.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "map", component: MapComponent, pathMatch: "full" },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
