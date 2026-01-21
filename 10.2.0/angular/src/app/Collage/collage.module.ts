import { CommonModule } from "@angular/common";
import { SharedModule } from "primeng/api";
import { CollageRoutingModule } from "./collage-routing.module";
import { CollageComponent } from "./collage.component";

import { NgModule } from "@angular/core";

import { EditCollageComponent } from "./edit/edit.component";
import { CreateCollageDialogComponent } from "./create/create.component";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CollageRoutingModule,

        // standalone components
        CollageComponent,
        CreateCollageDialogComponent,
        EditCollageComponent
    ],
})
export class CollageModule {}
