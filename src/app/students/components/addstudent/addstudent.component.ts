import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss'],
})
export class AddstudentComponent {
  // @Output() onStudentAdded: EventEmitter<void> = new EventEmitter<void>();

  hide = true;
  hideConfirm = true;
  message: string = '';
  addStudent = new FormGroup({
    FirstName: new FormControl(null, [Validators.required, Validators.email]),

    LastName: new FormControl(null, [Validators.required]),
    Mobile: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(01|01|00201)[0-2,5]{1}[0-9]{8}'),
    ]),
    Email: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
    ]),
    NationalID: new FormControl(null, [Validators.required]),

    Age: new FormControl(null, [Validators.required]),
  });

  constructor(
    private _student: StudentsService,
    private _toastr: ToastrService,
    private Router: Router
  ) {}

  onsubmit() {
    console.log('Register');

    this._student.addStudent(this.addStudent.value).subscribe({
      next: (res: any) => {
        console.log(res.Success);
        this._toastr.success(this.message, 'Successfully registered');
        // this.onStudentAdded.emit(); 
      },
      error: (err: any) => {
        console.error('An error occurred:', err);
      },

      complete: () => {
        this.addStudent.reset();
        this.Router.navigate(['/dashboard/students']);
      },
    });
  }
}
