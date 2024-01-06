import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DeleteComponent } from './components/delete/delete.component';
import { AddstudentComponent } from './components/addstudent/addstudent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'edit/:id', component: EditStudentComponent },
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    StudentsComponent,
    DeleteComponent,
    AddstudentComponent,
    EditStudentComponent,
  ],
})
export class StudentsModule {}
