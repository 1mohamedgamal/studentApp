import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogoutComponent } from 'src/app/auth/components/logout/logout.component';
import { AuthService } from 'src/app/auth/services/auth.service';
interface IMenu {
  title: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() isOpenedValue = new EventEmitter<boolean>();
  isOpened: boolean = true;
  isMaxHeight: boolean = true;
  is100vHeight: boolean = false;

  constructor(
    private _AuthService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  menu: IMenu[] = [
    {
      title: 'Home',
      icon: 'fa-solid fa-house',
      link: 'home',
    },

    {
      title: 'Students',
      icon: 'fa-solid fa-users',
      link: '/dashboard/students',
    },
  ];

  onClicked() {
    this.isOpened = !this.isOpened;
    this.isOpenedValue.emit(this.isOpened);
    console.log(this.isOpened);
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.scrollY;
    this.isMaxHeight = offset < 64;
    this.is100vHeight = offset > 64;
  }

  logOut() {
    const dialogRef = this.dialog.open(LogoutComponent, {
      data: {},
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        this.router.navigate(['/auth']);
      }
    });
  }
}
