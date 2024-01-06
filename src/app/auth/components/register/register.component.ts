import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide = true;
  hideConfirm = true;
  message: string = '';
  registerForm = new FormGroup({
    Name: new FormControl(null, [Validators.required]),
    UserName: new FormControl(null, [Validators.required, Validators.email]),
    Password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      ),
    ]),
  });

  constructor(
    private _AuthService: AuthService,
    private _toastr: ToastrService
  ) {}

  onsubmit() {
    console.log('Register');

    this._AuthService.onRegister(this.registerForm.value).subscribe({
      next: (res: any) => {
        if (res.Data && res.Success && res.IsAuzorized) {
          console.log(res.Success);
          this._toastr.success(this.message, 'Successfully registered');
          debugger;
        } else {
          console.log(res.Error);
        }
      },
      error: (err: any) => {
        console.error('An error occurred:', err);
      },

      complete: () => {
        this.registerForm.reset();
      },
    });
  }
}
