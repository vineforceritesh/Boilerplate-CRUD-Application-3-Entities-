import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import  { CollageComponent } from './collage.component';

const routes: Routes = [
    {
        path: '',
        component: CollageComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CollageRoutingModule {}
