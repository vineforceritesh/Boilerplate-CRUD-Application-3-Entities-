import { Component, Injector, ChangeDetectorRef, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { EditStudentDialogComponent } from './edit/edit.component';
import { Table, TableModule } from 'primeng/table';
import { LazyLoadEvent, PrimeTemplate } from 'primeng/api';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { appModuleAnimation } from '../../shared/animations/routerTransition';
import { PagedListingComponentBase } from '../../shared/paged-listing-component-base';
import { LocalizePipe } from '../../shared/pipes/localize.pipe';
import { StudentDto, StudentServiceProxy } from '../../shared/service-proxies/service-proxies';
import { CreateStudentDialogComponent } from './create/create.component';
// import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
  animations: [appModuleAnimation()],
  standalone: true,
 imports: [FormsModule, TableModule, PrimeTemplate, NgIf, PaginatorModule, LocalizePipe],
})
export class StudentComponent extends PagedListingComponentBase<StudentDto> {
getStudents() {
throw new Error('Method not implemented.');
}

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  students: StudentDto[] = [];
  keyword = '';
    primengTableHelper: any;

  constructor(
    injector: Injector,
    private _studentService: StudentServiceProxy,
    private _modalService: BsModalService,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  list(event?: LazyLoadEvent): void {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      if (this.primengTableHelper.records?.length) {
        return;
      }
    }

    this.primengTableHelper.showLoadingIndicator();

    this._studentService
      .getAll(
      )
      .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
      .subscribe((result) => {
        this.primengTableHelper.records = result;
        // this.primengTableHelper.totalRecordsCount = result.totalCount;PagedRoleResultRequestDto
        this.cd.detectChanges();
      });
  }

  createStudent(): void {
    const modalRef = this._modalService.show(CreateStudentDialogComponent, {
      class: 'modal-lg',
    });

    modalRef.content.onSave.subscribe(() => this.refresh());
  }

  editStudent(student: StudentDto): void {
    const modalRef = this._modalService.show(EditStudentDialogComponent, {
      class: 'modal-lg',
      initialState: {
        id: student.id,
      },
    });

    modalRef.content.onSave.subscribe(() => this.refresh());
  }

  delete(student: StudentDto): void {
    abp.message.confirm(
      this.l('StudentDeleteWarningMessage', student.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._studentService.delete(student.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
}
