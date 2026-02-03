import { Component, inject, Injector, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PatientAdmissionServiceProxy, PatientAdmissionDto, NameValueDto } from '../../shared/service-proxies/service-proxies';

import { AppComponentBase } from '../../shared/app-component-base';
import { CreatePatientAdmissionComponent } from './Create/Create.component';
import { CommonModule } from '@node_modules/@angular/common';
import { FormsModule } from '@node_modules/@angular/forms';
import { AbpModalHeaderComponent } from '@shared/components/modal/abp-modal-header.component';
import { AbpValidationSummaryComponent } from '@shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '@shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
  selector: 'app-patient-admission',
  templateUrl: './patientAdmission.component.html',
  standalone: true,
    imports: [
      CommonModule,
      FormsModule,
     
      LocalizePipe,
    ],
})
export class PatientAdmissionComponent extends AppComponentBase implements OnInit {

  patients: PatientAdmissionDto[] = [];
  bsModalRef?: BsModalRef; 

  filterPA : PatientAdmissionDto[] = [];

   keyword: string = '';

  

constructor(
  injector: Injector,
  private _paService: PatientAdmissionServiceProxy,
  
  private modalService: BsModalService
) {
  super(injector);
}




  ngOnInit(): void {
    this.loadPatients();
  }

 loadPatients(): void {
     this._paService.getAll().subscribe(
       (res: PatientAdmissionDto[]) => {
         this.patients = res;
         this.filterPA = [...this.patients]; // initialize filtered list
       },
       (err) => {
         console.error('API ERROR => ', err);
       }
     );
   }


  list(): void {

  console.log('Keyword:', this.keyword);
  console.log('Total patients:', this.patients.length);
  if (!this.keyword || this.keyword.trim() === '') {
    this.filterPA = [...this.patients];
  } else {
    const lowerKeyword = this.keyword.toLowerCase().trim();

    this.filterPA = this.patients.filter(p =>
      p.firstName?.toLowerCase().includes(lowerKeyword) ||
      p.fullName?.toLowerCase().includes(lowerKeyword) 
      
    );
  }
}


  createPatient(): void {
    this.bsModalRef = this.modalService.show(CreatePatientAdmissionComponent, { class: 'modal-lg' });
    this.bsModalRef.content.onSave.subscribe(() => this.loadPatients());
  }

  editPatient(patient: PatientAdmissionDto): void {
    this.bsModalRef = this.modalService.show(CreatePatientAdmissionComponent, { class: 'modal-lg' });
    this.bsModalRef.content.Pa = { ...patient };
    this.bsModalRef.content.onSave.subscribe(() => this.loadPatients());
  }

  deletePatient(patient: PatientAdmissionDto): void {
    if (!confirm('Are you sure to delete this patient?')) return;
    this._paService.delete(patient.id).subscribe(() => {
      this.notify.success('Deleted successfully', 'Success');
      this.loadPatients();
    });
  }
}
