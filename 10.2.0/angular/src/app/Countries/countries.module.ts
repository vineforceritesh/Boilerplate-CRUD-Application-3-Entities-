import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CountryRoutingModule } from './countries-routing.module';
import { CountryComponent } from './countries.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CountryRoutingModule,
    // standalone components
    // CountryComponent
  ]
})
export class CountryModule {}
