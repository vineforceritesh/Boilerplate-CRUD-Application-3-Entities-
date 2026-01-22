import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CityRoutingModule } from './city-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    RouterModule,
    CityRoutingModule,
    CommonModule, FormsModule, ModalModule
  ]
})
export class CityModule {}
