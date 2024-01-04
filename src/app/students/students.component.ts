import { Component, OnInit } from '@angular/core';
import { StudentsService } from './services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  studentsData: any[] = []; // Assuming the studentsData variable holds the fetched data

  constructor(private studentsService: StudentsService) {}

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
}
