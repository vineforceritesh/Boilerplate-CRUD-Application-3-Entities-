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

successMessage: string = '';
errorMessage: string = '';





  



  saving = false;

  // form model
  student: StudentDto = new StudentDto();

  // ✅ dropdown data
  collageList: NameValueDto[] = [];
  countryList: NameValueDto[] = [];
stateList: NameValueDto[] = [];
cityList: NameValueDto[] = [];

  onSave = output<EventEmitter<any>>();
countries: any;
states: any;
cities: any;

  constructor(
    injector: Injector,
    private _studentService: StudentServiceProxy,
    private _collageService: CollageServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

 ngOnInit(): void {
    this.loadColleges();
    this.loadCountries();
  }

 
  // ---------- College ----------
  loadColleges(): void {
    this._collageService.getCollegeLookup()
      .subscribe(result => {
        this.collageList = result;
        this.cd.detectChanges();
        console.log('Loaded colleges:', this.collageList);
      });
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


  // ---------- Save ----------
  save(): void {
  this.saving = true;

  const input = new CreateStudentDto();
  input.init(this.student);

  this._studentService.create(input).subscribe({
    next: () => {
  this.successMessage = "Student created successfully ✅";
  this.errorMessage = "";   

  this.notify.info(this.l('SavedSuccessfully'));
  this.onSave.emit(null);

  setTimeout(() => {
    this.bsModalRef.hide();
  }, 1200);
},
error: (err) => {
  this.saving = false;

  this.errorMessage = err.error?.error?.message || "Email already exists ❌";
  this.successMessage = "";  

  this.cd.detectChanges();
}

}
  );
  }
}