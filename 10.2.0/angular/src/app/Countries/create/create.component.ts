import { Component, Injector, output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  CountryServiceProxy,
  CreateCountryDto
} from '@shared/service-proxies/service-proxies';
import { AbpModalFooterComponent } from "@shared/components/modal/abp-modal-footer.component";
import { AbpModalHeaderComponent } from "@shared/components/modal/abp-modal-header.component";
import { LocalizePipe } from "../../../shared/pipes/localize.pipe";

@Component({
  templateUrl: './create.component.html',
  imports: [AbpModalFooterComponent, AbpModalHeaderComponent, LocalizePipe , FormsModule, CommonModule],
})
export class CreateCountryComponent extends AppComponentBase {

  saving = false;
  country = new CreateCountryDto();
  onSave = output<EventEmitter<any>>();

  constructor(
    injector: Injector,
    private _countryService: CountryServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
    this.country.isActive = true;
  }

  save(): void {
    this.saving = true;
    this._countryService.create(this.country).subscribe(() => {
      this.notify.success(this.l('SavedSuccessfully'));
      this.bsModalRef.hide();
      this.onSave.emit(null);
    });
  }
}
