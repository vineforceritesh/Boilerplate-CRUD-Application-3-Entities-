
import { Component, Injector, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@node_modules/@angular/common';
import { FormsModule } from '@node_modules/@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import {
  StateServiceProxy,
  CreateStateDto,
  CountryServiceProxy,
  CountryDto
} from '@shared/service-proxies/service-proxies';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './create-state.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalModule]
})
export class CreateStateComponent extends AppComponentBase implements OnInit {

  @Output() onSave = new EventEmitter<any>();

  state = new CreateStateDto();
  countries: CountryDto[] = [];
  saving = false;

  constructor(
    injector: Injector,
    private _stateService: StateServiceProxy,
    private _countryService: CountryServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.state.isActive = true;
    this.getCountries();
  }

  getCountries(): void {
    this._countryService.getAll().subscribe(res => {
      this.countries = res.items;
    });
  }



  save(): void {
    this.saving = true;
    this._stateService.createState(this.state).subscribe(() => {
      this.notify.success(this.l('SavedSuccessfully'));
      this.bsModalRef.hide();
      this.onSave.emit();
    }).add(() => this.saving = false);
  }
}
