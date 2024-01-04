import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [{ path: '', component: StudentsComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  declarations: [StudentsComponent, DeleteComponent],
})
export class StudentsModule {}
