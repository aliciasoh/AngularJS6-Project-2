import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { DrawingCanvasComponent } from './drawing-canvas/drawing-canvas.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    InstructionsComponent,
    InputFieldComponent,
    DrawingCanvasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
