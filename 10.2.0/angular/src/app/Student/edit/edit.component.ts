import { Component, Injector, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { FormsModule } from '@angular/forms';
import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';
import { AppComponentBase } from '../../../shared/app-component-base';
import { StudentDto, StudentServiceProxy, UpdateStudentDto } from '../../../shared/service-proxies/service-proxies';


@Component({
  templateUrl: 'edit.component.html',
  standalone: true,
  imports: [
    FormsModule,
    AbpModalHeaderComponent,
    AbpValidationSummaryComponent,
    AbpModalFooterComponent,
    LocalizePipe,
  ],
})
export class EditStudentDialogComponent
  extends AppComponentBase
  implements OnInit {

  @Output() onSave = new EventEmitter<any>();

  saving = false;
  id!: number;

  student: StudentDto = new StudentDto();

  constructor(
    injector: Injector,
    private _studentService: StudentServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    // this._studentService.getAll().subscribe(result => {
     
    //   this.cd.detectChanges();
    // });
  }

  save(): void {
    this.saving = true;

    const input = new UpdateStudentDto();
    input.init(this.student);

    this._studentService.update(input).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
        this.cd.detectChanges();
      }
    );
  }
}
