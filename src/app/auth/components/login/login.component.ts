import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;

  constructor(
    private _AuthService: AuthService,
    private _toastr: ToastrService,
    private _Router: Router,
    private dialog: MatDialog
  ) {}

  loginForm = new FormGroup({
    UserName: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      ),
    ]),
  });

  message: string = '';
  onSubmit(data: FormGroup) {
    console.log(data);
    this._AuthService.onLogin(data.value).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message;
        localStorage.setItem('userToken', res.token);
      },
      error: (err) => {
        this._toastr.error(err.error.message, 'Error!');
      },
      complete: () => {
        this._Router.navigate(['/dashboard']);
        this._toastr.success('Logged In', 'Successfully');
      },
    });
  }

  ngOnInit() {}
}
