import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path: 'test', component: TestComponent},
  {path: 'patients', component: TestComponent},
  {path: 'sign-in', component: LoginComponent},
  {path: '', redirectTo: 'test', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
