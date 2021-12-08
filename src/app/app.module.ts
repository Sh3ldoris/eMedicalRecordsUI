import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule  } from '@angular/forms'
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { FilterComponent } from './components/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { AllPatientsComponent } from './components/all-patients/all-patients.component';
import { RecordsListComponent } from './components/records-list/records-list.component';
import { RecordDetailComponent } from './components/record-detail/record-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { PatientDocumentationComponent } from './components/patient-documentation/patient-documentation.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HealthRecordListComponent } from './components/health-record-list/health-record-list.component';
import { HealthRecordDetailComponent } from './components/health-record-detail/health-record-detail.component';
import { NewHealthRecordComponent } from './components/new-health-record/new-health-record.component';
import { CanAccessPatientsComponent } from './components/can-access-patients/can-access-patients.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    NavbarComponent,
    LoginComponent,
    FilterComponent,
    AllPatientsComponent,
    RecordsListComponent,
    RecordDetailComponent,
    PatientDocumentationComponent,
    HealthRecordListComponent,
    HealthRecordDetailComponent,
    NewHealthRecordComponent,
    CanAccessPatientsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
