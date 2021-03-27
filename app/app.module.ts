import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InputsModule } from "@progress/kendo-angular-inputs";

import "hammerjs";

import { AppComponent } from "./app.component";
import { PercentInputComponent } from "./percent-input.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent, PercentInputComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
