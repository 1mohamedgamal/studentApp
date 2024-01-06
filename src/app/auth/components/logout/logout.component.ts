import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-out',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(
    public dialogRef: MatDialogRef<LogoutComponent>,
    private _authservice: AuthService,
    private router: Router
  ) {}

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this._authservice.onLogOut().subscribe((result) => {
      if (result.IsAuthorized && result.Success) {
        localStorage.removeItem('userToken');
        this.router.navigate(['']);
      }
    });
    this.dialogRef.close(true);
  }
}
