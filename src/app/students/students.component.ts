import { Component, OnInit } from '@angular/core';
import { StudentsService } from './services/students.service';
import { AddstudentComponent } from './components/addstudent/addstudent.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  studentsData: any[] = []; // Assuming the studentsData variable holds the fetched data

  constructor(private studentsService: StudentsService , private dialog : MatDialog ) {}

  ngOnInit(): void {
    this.StudentsData();
  }

  StudentsData() {
    this.studentsService.getStudents().subscribe(
      (data: any) => {
        // Assuming the API response is stored in 'data'
        this.studentsData = data.Data; // Assigning the fetched data to studentsData
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  addStudentDialoug(){
     const dialogRef = this.dialog.open(AddstudentComponent, {
       data: {},
       width: '35%',
     });
  }
}
