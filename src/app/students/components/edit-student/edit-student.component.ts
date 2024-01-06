import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
  message: string = '';
  studentId: string = '';
  studentdata: any;

  editStudent = new FormGroup({
    NameArabic: new FormControl(null, [Validators.required]),
    NameEnglish: new FormControl(null, [Validators.required]),
    ID: new FormControl(),
    FirstName: new FormControl(null, [Validators.required]),
    LastName: new FormControl(null, [Validators.required]),
    Mobile: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(01|011|012|015)[0-9]{8}$/),
    ]),
    Email: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    ]),
    NationalID: new FormControl(null, [Validators.required]),
    Age: new FormControl(null, [Validators.required]),
  });

  
  constructor(
    private _studentService: StudentsService,
    private _toastr: ToastrService,
    private route: ActivatedRoute,
    private Router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.studentId = params['id'];
        this.getStudentById(this.studentId);
      }
    });
  }

  getStudentById(ID: string) {
    this._studentService.getStudentById(ID).subscribe({
      next: (res) => {
        this.studentdata = res;
        this.editStudent.patchValue({
          FirstName: this.studentdata?.Data?.FirstName,
          LastName: this.studentdata?.Data?.LastName,
          Mobile: this.studentdata?.Data?.Mobile,
          Email: this.studentdata?.Data?.Email,
          NationalID: this.studentdata?.Data?.NationalID,
          Age: this.studentdata?.Data?.Age,
          ID: this.studentdata?.Data?.ID,
          NameArabic: this.studentdata?.Data?.NameArabic,
          NameEnglish: this.studentdata?.Data?.NameEnglish,
        });
      },
      error: (err) => {
        console.error('An error occurred:', err);
      },
    });
  }

  onSubmit(editStudent: FormGroup) {
    // debugger
    // test
    // test
    this._studentService.updateStudent(this.editStudent.value).subscribe({
      next: (res: any) => {},
      error: (err: any) => {
        console.error('An error occurred during update:', err);
      },

      complete: () => {
        this._toastr.success('Successfully updated');
        this.Router.navigate(['/dashboard/students']);
      },
    });
  }
}
