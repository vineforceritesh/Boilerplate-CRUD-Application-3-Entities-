

import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PatientsDto, PatientsServiceProxy } from '../../shared/service-proxies/service-proxies';
import { CreatePatientComponent } from './create/create.component';
import { EditPatientComponent } from './edit/edit.component';
import { LocalizePipe } from "../../shared/pipes/localize.pipe";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LocalizePipe
  ]
})
export class PatientsComponent implements OnInit {

  
  patients: PatientsDto[] = [];

 
  filteredPatients: PatientsDto[] = [];


  keyword: string = '';

  constructor(
    private _patientsService: PatientsServiceProxy,
    private _modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  // Load patients from API
  loadPatients(): void {
    this._patientsService.getAllPatients().subscribe(
      (res: PatientsDto[]) => {
        this.patients = res;
        this.filteredPatients = [...this.patients]; 
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
    this.filteredPatients = [...this.patients];
  } else {
    const lowerKeyword = this.keyword.toLowerCase().trim();

    this.filteredPatients = this.patients.filter(p =>
      p.firstName?.toLowerCase().includes(lowerKeyword) ||
      p.lastName?.toLowerCase().includes(lowerKeyword) ||
      p.patientCode?.toLowerCase().includes(lowerKeyword) ||
      p.email?.toLowerCase().includes(lowerKeyword) ||
      p.phoneNumber?.includes(lowerKeyword)
    );
  }
}


  // Open create patient modal
  createPatient(): void {
    const ref = this._modalService.show(CreatePatientComponent, { class: 'modal-lg' });
    ref.content.onSave.subscribe(() => this.loadPatients());
  }

  // Open edit patient modal
  editPatient(p: PatientsDto): void {
    const ref = this._modalService.show(EditPatientComponent, {
      class: 'modal-lg',
      initialState: { id: p.id }
    });
    ref.content.onSave.subscribe(() => this.loadPatients());
  }

  // Delete patient
  deletePatient(p: PatientsDto): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this._patientsService.deletePatient(p.id).subscribe(() => {
        this.loadPatients();
      });
    }
  }
}
