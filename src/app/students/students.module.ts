import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DeleteComponent } from './components/delete/delete.component';
import { AddstudentComponent } from './components/addstudent/addstudent.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [{ path: '', component: StudentsComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [StudentsComponent, DeleteComponent, AddstudentComponent],
})
export class StudentsModule {}
