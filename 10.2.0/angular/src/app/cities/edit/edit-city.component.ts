
import { Component, Injector, EventEmitter, Output, OnInit } from '@angular/core';

import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '../../../shared/app-component-base';
import { CityServiceProxy, StateDto, StateServiceProxy, UpdateCityDto } from '../../../shared/service-proxies/service-proxies';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  templateUrl: './edit-city.component.html'
  ,
 imports: [CommonModule, FormsModule, ModalModule]
})
export class EditCityComponent extends AppComponentBase implements OnInit {

  @Output() onSave = new EventEmitter<any>();

  city = new UpdateCityDto();
  states: StateDto[] = [];
  id!: number;
  saving = false;

  constructor(
    injector: Injector,
    private _cityService: CityServiceProxy,
    private _stateService: StateServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getStates();
    this.loadCity();
  }

  getStates(): void {
    this._stateService.getAllStates().subscribe(res => {
      this.states = res;
    });
  }

  loadCity(): void {
    this._cityService.getAllCities().subscribe(res => {
      const c = res.find(x => x.id === this.id);
      if (c) {
        this.city = c as UpdateCityDto;
      }
    });
  }

  save(): void {
    this.saving = true;
    this._cityService.updateCity(this.city).subscribe(() => {
      this.notify.success(this.l('UpdatedSuccessfully'));
      this.bsModalRef.hide();
      this.onSave.emit();
    }).add(() => this.saving = false);
  }
}
