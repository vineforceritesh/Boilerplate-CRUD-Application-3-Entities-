import { Component, Injector, ChangeDetectorRef, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';

import { EditStudentDialogComponent } from './edit/edit.component';
import { CreateStudentDialogComponent } from './create/create.component';

import { Table, TableModule } from 'primeng/table';
import { LazyLoadEvent, PrimeTemplate } from 'primeng/api';
import { Paginator, PaginatorModule } from 'primeng/paginator';

import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

import { appModuleAnimation } from '../../shared/animations/routerTransition';
import { PagedListingComponentBase } from '../../shared/paged-listing-component-base';
import { LocalizePipe } from '../../shared/pipes/localize.pipe';

import { StudentDto, StudentServiceProxy } from '../../shared/service-proxies/service-proxies';

@Component({
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
  animations: [appModuleAnimation()],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    
    NgIf,
    PaginatorModule,
    LocalizePipe
  ],
})
export class StudentComponent{


  @ViewChild('dataTable', { static: true }) dataTable!: Table;
  @ViewChild('paginator', { static: true }) paginator!: Paginator;

  keyword = '';


  constructor(
    injector: Injector,
    private _studentService: StudentServiceProxy,
    private _modalService: BsModalService,
    cd: ChangeDetectorRef
  ) {
  }

  students: StudentDto[] =[];



  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._studentService.getAll().subscribe(result => {
      this.students = result;
    });
  }
  
 

  
  createStudent(): void {
    const modalRef = this._modalService.show(CreateStudentDialogComponent, {
      class: 'modal-lg',
    });

    modalRef.content.onSave.subscribe(() => this.loadData());

  }


  editStudent(student: StudentDto): void {
    const modalRef = this._modalService.show(EditStudentDialogComponent, {
      class: 'modal-lg',
      initialState: {
        id: student.id,
      },
    });

    modalRef.content.onSave.subscribe(() => this.loadData());

  }

  
  delete(collage: StudentDto): void {
      this._studentService.delete(collage.id).subscribe(() => {
        this.loadData();
      });
    }
  }
