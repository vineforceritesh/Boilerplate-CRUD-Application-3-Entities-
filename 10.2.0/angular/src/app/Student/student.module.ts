import { CommonModule } from "@angular/common";
import { SharedModule } from "primeng/api";
import { StudentRoutingModule } from "./student-routing.module";
import { StudentComponent } from "./student.component";
import { CreateStudentDialogComponent } from "./create/create.component";
import { EditStudentDialogComponent } from "./edit/edit.component";
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StudentRoutingModule,

        // standalone components
        StudentComponent,
        CreateStudentDialogComponent,
        EditStudentDialogComponent
    ],
})
export class StudentModule {}
