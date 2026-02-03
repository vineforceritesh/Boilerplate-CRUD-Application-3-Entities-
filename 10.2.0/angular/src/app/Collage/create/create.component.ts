import {
  Component,
  Injector,
  OnInit,
  ChangeDetectorRef,
  output,
  EventEmitter
} from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';

import { AppComponentBase } from '../../../shared/app-component-base';

import {
  CreateCollegeDto,
  CollegeDto,
  CollageServiceProxy,
  CityDto,
  CityServiceProxy
} from '../../../shared/service-proxies/service-proxies';
import { CommonModule } from '@node_modules/@angular/common';

@Component({
  templateUrl: 'create.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AbpModalHeaderComponent,
    AbpModalFooterComponent,
    AbpValidationSummaryComponent,
    LocalizePipe
  ]
})
export class CreateCollageDialogComponent
  extends AppComponentBase
  implements OnInit {

  saving = false;

  collage: CollegeDto = new CollegeDto();

  cities: CityDto[] = [];

  onSave = output<EventEmitter<any>>();

  constructor(
    injector: Injector,
    private _collageService: CollageServiceProxy,
    private _cityService: CityServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadCities();
  }

 loadCities(): void {
  this._cityService.getAllCities().subscribe((res: CityDto[]) => {
    this.cities = res;  
    this.cd.detectChanges();
  });
}


  save(): void {
    this.saving = true;

    const input = new CreateCollegeDto();
    input.init(this.collage);

    this._collageService.create(input).subscribe(
      () => {
        this.notify.success('Collage created successfully ✅', 'Success');
        this.bsModalRef.hide();
        this.onSave.emit(null);
      },
      () => {
        this.saving = false;
        this.cd.detectChanges();
      }
    );
  }
}
