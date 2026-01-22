import { Component, Injector, OnInit } from '@angular/core';

import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { CreateStateComponent } from './create/create-state.component';
import { EditStateComponent } from './edit/edit-state.component';
import { AppComponentBase } from '../../shared/app-component-base';
import { StateDto, StateServiceProxy } from '../../shared/service-proxies/service-proxies';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  templateUrl: './states.component.html',
  imports: [CommonModule, FormsModule, ModalModule]

})
export class StatesComponent extends AppComponentBase implements OnInit {

  states: StateDto[] = [];
    message: any;
    notify: any;

  constructor(
    injector: Injector,
    private _stateService: StateServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getStates();
  }

  getStates(): void {
    this._stateService.getAllStates().subscribe(res => {
      this.states = res;
    });
  }

  create(): void {
    const modal = this._modalService.show(CreateStateComponent, {
      class: 'modal-lg'
    });

    modal.content.onSave.subscribe(() => {
      this.getStates();
    });
  }

  edit(state: StateDto): void {
    const modal = this._modalService.show(EditStateComponent, {
      class: 'modal-lg',
      initialState: {
        id: state.id
      }
    });

    modal.content.onSave.subscribe(() => {
      this.getStates();
    });
  }

  delete(state: StateDto): void {
    this.message.confirm(
      this.l('DeleteWarningMessage'),
      state.name,
      (result: boolean) => {
        if (result) {
          this._stateService.deleteState(state.id).subscribe(() => {
            this.notify.success(this.l('SuccessfullyDeleted'));
            this.getStates();
          });
        }
      }
    );
  }
    l(arg0: string): any {
        throw new Error('Method not implemented.');
    }
}
