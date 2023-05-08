import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TictactoeComponent } from './components/tictactoe/tictactoe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactusComponent } from './components/contactus/contactus.component';
import { RibbonComponent } from './components/ribbon/ribbon.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { TechnicalskillsComponent } from './components/technicalskills/technicalskills.component';
import { SoftwareskillsComponent } from './components/softwareskills/softwareskills.component';

@NgModule({
  declarations: [
    AppComponent,
    TictactoeComponent,
    ContactusComponent,
    RibbonComponent,
    AboutmeComponent,
    TechnicalskillsComponent,
    SoftwareskillsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
