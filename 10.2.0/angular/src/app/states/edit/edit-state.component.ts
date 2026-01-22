
import { Component, Injector, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@node_modules/@angular/common';
import { FormsModule } from '@node_modules/@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import {
  StateServiceProxy,
  UpdateStateDto,
  CountryServiceProxy,
  CountryDto
} from '@shared/service-proxies/service-proxies';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './edit-state.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalModule]
})



export class EditStateComponent extends AppComponentBase implements OnInit {

  @Output() onSave = new EventEmitter<any>();

  state = new UpdateStateDto();
  countries: CountryDto[] = [];
  id!: number;
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
    this.loadState();
  }

  getCountries(): void {
    this._countryService.getAll().subscribe(res => {
      this.countries = res.items;
    });
  }

  loadState(): void {
    this._stateService.getAllStates().subscribe(res => {
      const s = res.find(x => x.id === this.id);
      if (s) {
        this.state = s as UpdateStateDto;
      }
    });
  }

  save(): void {
    this.saving = true;
    this._stateService.updateState(this.state).subscribe(() => {
      this.notify.success(this.l('UpdatedSuccessfully'));
      this.bsModalRef.hide();
      this.onSave.emit();
    }).add(() => this.saving = false);
  }
}
