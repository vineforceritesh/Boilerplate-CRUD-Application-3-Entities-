import {
  Component,
  Injector,
  OnInit,
  ChangeDetectorRef,
  EventEmitter,
  Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';

import { AppComponentBase } from '../../../shared/app-component-base';
import { CreatePatientsDto, PatientsServiceProxy } from '../../../shared/service-proxies/service-proxies';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';


@Component({
  templateUrl: 'create.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AbpModalHeaderComponent,
    AbpValidationSummaryComponent,
    AbpModalFooterComponent,
    LocalizePipe
  ]
})
export class CreatePatientComponent extends AppComponentBase implements OnInit {

  saving = false;
  successMessage: string = '';
  errorMessage: string = '';

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  // form model
  patient: CreatePatientsDto = new CreatePatientsDto();

  @Output() onSave = new EventEmitter<void>();

  constructor(
    injector: Injector,
    private _patientsService: PatientsServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef,
     private http: HttpClient
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

   
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Upload photo to server
  async uploadPhoto(patientId: number) {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const response: any = await this.http.post(
      `/api/app/patient/upload-photo?patientId=${patientId}`,
      formData
    ).toPromise();

    console.log("Photo uploaded: ", response);

   
    this.patient.photo = response;
  }

  async save(): Promise<void> {
    this.saving = true;

    try {
      if (this.patient.dateOfBirth) {
        this.patient.dateOfBirth = moment(this.patient.dateOfBirth);
      }

     

      
      this._patientsService.createPatient(this.patient).subscribe({
        next: () => {
          this.saving = false;

          this.notify.success(
            `${this.patient.firstName} ${this.patient.lastName} created successfully ✅`,
            'Success'
          );

          this.onSave.emit();

          setTimeout(() => this.bsModalRef.hide(), 1200);
        },
        error: (err) => {
          this.saving = false;

          const errorMsg =
            err?.error?.error?.message ||
            'Something went wrong while creating patient';
          this.notify.error(errorMsg, 'Error');

          this.cd.detectChanges();
        }
      });
    } catch (err) {
      this.saving = false;
      this.notify.error('Photo upload failed', 'Error');
    }
  }
}


