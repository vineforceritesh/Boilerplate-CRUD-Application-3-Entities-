import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CountryServiceProxy,
  CountryDto
} from '@shared/service-proxies/service-proxies';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CreateCountryComponent } from './create/create.component';
import { EditCountryComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalizePipe } from '@shared/pipes/localize.pipe';


@Component({
  templateUrl: './countries.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, LocalizePipe]
})
export class CountryComponent {
  countries: CountryDto[] = [];
  message: any;
  notify: any;
  constructor(
    injector: Injector,
    private _countryService: CountryServiceProxy,
    private _modalService: BsModalService
  ) {
    // super(injector);
  }
ngOnInit(): void {
  this.getCountries(); // ✅ no subscribe here
}

 getCountries(): void {
  this._countryService.getAll().subscribe(res => {
    this.countries = res.items;
  });
}

  create(): void {
    const modal = this._modalService.show(CreateCountryComponent);
    modal.content.onSave.subscribe(() => this.getCountries());
  }

  edit(country: CountryDto): void {
    const modal = this._modalService.show(EditCountryComponent, {
      initialState: { id: country.id }
    });
    modal.content.onSave.subscribe(() => this.getCountries());
  }

  delete(country: CountryDto): void {
    this.message.confirm('DeleteWarningMessage', country.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._countryService.delete(country.id).subscribe(() => {
            this.notify.success(this.l('SuccessfullyDeleted'));
            this.getCountries();
          });
        }
      }
      
    
  }
  l(arg0: string): any {
    throw new Error('Method not implemented.');
  }
}
