
import { Component, Injector, EventEmitter, Output, OnInit } from '@angular/core';

import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { CityServiceProxy, CreateCityDto, StateDto, StateServiceProxy } from '../../../shared/service-proxies/service-proxies';
import { AppComponentBase } from '../../../shared/app-component-base';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  templateUrl: './create-city.component.html'

,
imports: [CommonModule, FormsModule, ModalModule]

})
export class CreateCityComponent extends AppComponentBase implements OnInit {

  @Output() onSave = new EventEmitter<any>();

  city = new CreateCityDto();
  states: StateDto[] = [];
  saving = false;
  notify: any;

  constructor(
    injector: Injector,
    private _cityService: CityServiceProxy,
    private _stateService: StateServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.city.isActive = true;
    this.getStates();
  }

  getStates(): void {
    this._stateService.getAllStates().subscribe(res => {
      this.states = res;
    });
  }

  save(): void {
    this.saving = true;
    this._cityService.createCity(this.city).subscribe(() => {
      this.notify.success(this.l('SavedSuccessfully'));
      this.bsModalRef.hide();
      this.onSave.emit();
    }).add(() => this.saving = false); 
  }
  l(arg0: string): any {
    throw new Error('Method not implemented.');
  }
}
