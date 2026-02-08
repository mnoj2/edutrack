import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StudentRegComponent } from './components/student-reg/student-reg.component';
import { StudentListComponent } from './components/student-list/student-list.component';

import { provideHotToastConfig } from '@ngneat/hot-toast';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    StudentRegComponent,
    StudentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [ 
    provideHotToastConfig({
    success: {
        iconTheme: {
          primary: '#9ACD3A',   
          secondary: '#0F120D',  
        },
        style: {
          border: '3px solid #0F120D',
          borderRadius: '0px',
          background: 'white',
          color: '#0F120D',
          fontWeight: 'bold',
        },
      },
      error: {
        iconTheme: {
          primary: '#FF4C4C',    
          secondary: '#0F120D',  
        },
        style: {
          border: '3px solid #0F120D', 
          borderRadius: '0px',
          background: 'white',
          color: '#0F120D',
          fontWeight: 'bold',
        },
      },
      })
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
