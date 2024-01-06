import { Component, OnInit } from '@angular/core';
import { StudentsService } from './services/students.service';
import { AddstudentComponent } from './components/addstudent/addstudent.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from './components/delete/delete.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  studentsData: any[] = []; // Assuming the studentsData variable holds the fetched data

  constructor(
    private studentsService: StudentsService,
    private dialog: MatDialog,
    private Router: Router,
    private _ToastrService: ToastrService
  ) {}
  searchValue: any;
  ngOnInit(): void {
    this.StudentsData(null as any);
  }

  StudentsData(text: string) {
    this.studentsService.getStudents().subscribe(
      (data: any) => {
        this.studentsData = data.Data;
        if (text) {
          this.studentsData = this.studentsData.filter(
            (st) =>
              st.Name.includes(text) |
                st.Email.includes(text) |
                st.Mobile.includes(text) 
                // st.NationlID.includes(text) 
                //  st.Age.includes(text)
          );
        }
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  addStudentDialog() {
    const dialogRef = this.dialog.open(AddstudentComponent, {
      data: {},
      width: '35%',
    });

    // dialogRef.componentInstance.onStudentAdded.subscribe(() => {
    //   this.StudentsData(null as any);
    // });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.StudentsData(null as any);
    });
  }

  openDeletedialoug(ID: number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { ID },
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.onDeleteStudent(result.ID);
        this.Router.navigate(['/dashboard/students']);
      }
    });
  }

  onDeleteStudent(id: number) {
    debugger;
    this.studentsService.onDelete(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error('Error');
      },
      complete: () => {
        this.StudentsData(null as any);
        this._ToastrService.success('Student deleted', 'Success');
      },
    });
  }
}
