import { Component, Injector, OnInit, output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CountryServiceProxy,
  UpdateCountryDto
} from '@shared/service-proxies/service-proxies';
import { SharedModule } from "@shared/shared.module";
import { CommonModule } from '@node_modules/@angular/common';

@Component({
  templateUrl: './edit.component.html',
  imports: [SharedModule,CommonModule]
})
export class EditCountryComponent  implements OnInit {

  id!: number;
  country = new UpdateCountryDto();
  onSave = output<EventEmitter<any>>();
  notify: any;

  constructor(
    injector: Injector,
    private _countryService: CountryServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    // super(injector);
  }

  ngOnInit(): void {
    this._countryService.getAll().subscribe(res => {
      this.country.init(res);
    });
  }

   save(): void {
    this._countryService.update(this.country).subscribe(() => {
      this.notify.success(this.l('SavedSuccessfully'));
      this.bsModalRef.hide();
      this.onSave.emit(null);
    });
  }
  l(arg0: string): any {
    throw new Error('Method not implemented.');
  }
}
