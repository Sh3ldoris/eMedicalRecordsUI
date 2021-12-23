import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import {LoginComponent} from "./components/login/login.component";
import {AllPatientsComponent} from "./components/all-patients/all-patients.component";
import {PatientDocumentationComponent} from "./components/patient-documentation/patient-documentation.component";
import {CanAccessPatientsComponent} from "./components/can-access-patients/can-access-patients.component";
import {AmbulanceComponent} from "./components/ambulance/ambulance.component";

const routes: Routes = [
  {path: 'test', component: TestComponent},
  {path: 'patients/all', component: AllPatientsComponent},
  {path: 'patients/mine', component: CanAccessPatientsComponent},
  {path: 'patients/documentation/:id', component: PatientDocumentationComponent},
  {path: 'sign-in', component: LoginComponent},
  {path: 'ambulance', component: AmbulanceComponent},
  {path: '', redirectTo: 'patients/all', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
