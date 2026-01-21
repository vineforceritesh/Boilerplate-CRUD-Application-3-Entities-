import {
  Component,
  Injector,
  OnInit,
  ChangeDetectorRef,
  EventEmitter,
  output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

import { AppComponentBase } from '../../../shared/app-component-base';
import {
  
  UpdateCollegeDto,
  CollageServiceProxy,
} from '../../../shared/service-proxies/service-proxies';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';

@Component({
  templateUrl: 'edit.component.html',
  standalone: true,
  imports: [
    FormsModule,
    AbpModalHeaderComponent,
    AbpModalFooterComponent,
    AbpValidationSummaryComponent,
    LocalizePipe,
  ],
})
export class EditCollageComponent
  extends AppComponentBase
  implements OnInit {

  saving = false;
  id!: number;

  collage: UpdateCollegeDto = new UpdateCollegeDto();

  onSave = output<EventEmitter<any>>();

  constructor(
    injector: Injector,
    private _collageService: CollageServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

 ngOnInit(): void {
    this._collageService.getAll().subscribe(result => {
     
      this.cd.detectChanges();
    });
  }

  save(): void {
    this.saving = true;

    this._collageService.update(this.collage).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
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
