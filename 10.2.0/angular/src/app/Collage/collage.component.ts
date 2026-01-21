import { Component, Injector, ChangeDetectorRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CollegeDto, CollageServiceProxy } from '../../shared/service-proxies/service-proxies';
import { CreateCollageDialogComponent } from './create/create.component';
import { EditCollageComponent } from './edit/edit.component';
import { LocalizePipe } from "../../shared/pipes/localize.pipe";

@Component({
  templateUrl: './collage.component.html',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    LocalizePipe
]
})
export class CollageComponent {

  collages: CollegeDto[] = [];

  constructor(
    private _collageService: CollageServiceProxy,
    private _modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._collageService.getAll().subscribe(result => {
      this.collages = result;   // 🔥 THIS FIXES UI
    });
  }

  createCollage(): void {
    const modalRef = this._modalService.show(CreateCollageDialogComponent);
    modalRef.content.onSave.subscribe(() => this.loadData());
  }

  editCollage(collage: CollegeDto): void {
    const modalRef = this._modalService.show(EditCollageComponent, {
      initialState: { id: collage.id }
    });
    modalRef.content.onSave.subscribe(() => this.loadData());
  }

  delete(collage: CollegeDto): void {
    this._collageService.delete(collage.id).subscribe(() => {
      this.loadData();
    });
  }
}
