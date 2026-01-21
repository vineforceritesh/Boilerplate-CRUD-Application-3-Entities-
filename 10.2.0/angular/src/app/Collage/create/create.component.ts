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
  CollageServiceProxy
} from '../../../shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'create.component.html',
  standalone: true,
  imports: [
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
    // No data to load for create
  }

  save(): void {
    this.saving = true;

    const input = new CreateCollegeDto();
    input.init(this.collage);

    this._collageService.create(input).subscribe(
      () => {
        this.notify.success(this.l('SavedSuccessfully'));
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
