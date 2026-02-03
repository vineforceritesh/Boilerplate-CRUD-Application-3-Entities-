import {
  Component,
  Injector,
  OnInit,
  ChangeDetectorRef,
  output,
  EventEmitter,
 
} from '@angular/core';


import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';

import { AppComponentBase } from '../../../shared/app-component-base';

import {
  CreateStudentDto,
  StudentDto,
  StudentServiceProxy,
  NameValueDto,
  CollageServiceProxy,
  CountryDto,
  StateDto,
  CityDto
} from '../../../shared/service-proxies/service-proxies';
import { CommonModule } from '@angular/common';


@Component({
  templateUrl: 'create.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AbpModalHeaderComponent,
    AbpValidationSummaryComponent,
    AbpModalFooterComponent,
    LocalizePipe,
    
],
})
export class CreateStudentDialogComponent
  extends AppComponentBase
  implements OnInit {
[x: string]: any;

successMessage: string = '';
errorMessage: string = '';








  



  saving = false;

  // form model
  student: StudentDto = new StudentDto();

  // dropdown data
  
  countryList: NameValueDto[] = [];
stateList: NameValueDto[] = [];
cityList: NameValueDto[] = [];
collageList: NameValueDto[] = [];

  onSave = output<EventEmitter<any>>();
countries: any;
states: any;
cities: any;
collages: any;


  constructor(
    injector: Injector,
    private _studentService: StudentServiceProxy,
    // private _collageService: CollageServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

 ngOnInit(): void {
   
    this.loadCountries();
  }

 
  
  // ---------- Country ----------
  loadCountries(): void {
    this._studentService.getCountryLookup()
      .subscribe(result => {
        this.countryList = result;
        this.cd.detectChanges();
        console.log('Loaded countries:', this.countryList);
      });
  }

  // ---------- Country Change → Load States ----------
  onCountryChange(countryId: number): void {
    this.student.stateId = null!;
    this.student.cityId = null!;
    this.stateList = [];
    this.cityList = [];

    if (!countryId) {
      return;
    }

    this._studentService.getStateLookup(countryId)
      .subscribe(result => {
        this.stateList = result;
        this.cd.detectChanges();
        console.log('Loaded states by country:', this.stateList);
      });
  }

  // ---------- State Change → Load Cities ----------
  onStateChange(stateId: number): void {
    this.student.cityId = null!;
    this.cityList = [];

    if (!stateId) {
      return;
    }

    this._studentService.getCityLookup(stateId)
      .subscribe(result => {
        this.cityList = result;
        this.cd.detectChanges();
        console.log('Loaded cities by state:', this.cityList);
      });
  }
  // 

  onCityChange(cityId: number) : void{
    this.student.collageId = null!;
    this.collageList = [];

    if(!cityId){
       return;
    }
      this._studentService.getCollageLookup(cityId).subscribe(result => {
        this.collageList = result;
        this.cd.detectChanges();
        console.log('loded collage by city', this.collageList)
      });
    }
  






  // ---------- Save ----------
 save(): void {
  this.saving = true;

  const input = new CreateStudentDto();
  input.init(this.student);

  this._studentService.create(input).subscribe({
    next: () => {
      this.saving = false;

      // Success Popup
              this.notify.success(
             ` ${this.student.name} , created successfully ✅`,
          'Success'
        );


      this.onSave.emit(null);

      setTimeout(() => {
        this.bsModalRef.hide();
      }, 1200);
    },

    error: (err) => {
      this.saving = false;

      // Backend ka error message extract karna
      const errorMsg =
        err?.error?.error?.message || 'Email already exists ❌';   

      //   Errro Popu
      this.notify.error(errorMsg, 'Error');

      this.cd.detectChanges();
    }
  });
}
}
