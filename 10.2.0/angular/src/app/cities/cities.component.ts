
import { Component, Injector, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { CreateCityComponent } from './create/create-city.component';
import { EditCityComponent } from './edit/edit-city.component';
import { AppComponentBase } from '../../shared/app-component-base';
import { CityDto, CityServiceProxy } from '../../shared/service-proxies/service-proxies';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  templateUrl: './cities.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})


export class CitiesComponent extends AppComponentBase implements OnInit {

  cities: CityDto[] = [];

  constructor(
    injector: Injector,
    private _cityService: CityServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getCities();
  }

  getCities(): void {
    this._cityService.getAllCities().subscribe(res => {
      this.cities = res;
    });
  }

  create(): void {
    const modal = this._modalService.show(CreateCityComponent, { class: 'modal-lg' });
    modal.content.onSave.subscribe(() => this.getCities());
  }

  edit(city: CityDto): void {
    const modal = this._modalService.show(EditCityComponent, {
      class: 'modal-lg',
      initialState: { id: city.id }
    });
    modal.content.onSave.subscribe(() => this.getCities());
  }

  delete(city: CityDto): void {
    this.message.confirm(
      this.l('DeleteWarningMessage'),
      city.name,
      (result: boolean) => {
        if (result) {
          this._cityService.deleteCity(city.id).subscribe(() => {
            this.notify.success(this.l('SuccessfullyDeleted'));
            this.getCities();
          });
        }
      }
    );
  }
}
