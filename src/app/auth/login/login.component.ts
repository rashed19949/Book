import { Component, ElementRef, OnInit, Renderer2, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { mergeMap, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  showModel:boolean = false
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  activeUser: any;
  adminUser: any = {
    firstName: 'ADMIN',
    lastName: 'ADMIN',
    displayName: 'ADMIN ADMIN',
    email: 'admin@gmail.com',
    password: 'Admin@123',
    role: 'ADMIN'
  }
  constructor(private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private usersService: UserService
  ) { }

  ngOnInit(): void {
    this.usersService.getAdminUser()
      .pipe(
        switchMap((user: any) => {
          if (user) {
            return of(user)
          }
          else {
            const { email, password } = this.adminUser;
            return this.authService.signup(email, password).pipe(
              mergeMap((res: any) => {
                this.adminUser.uid = res.user.uid;
                return this.usersService.addUser(this.adminUser)
              }
              )
            )
          }
        })
      )
      .subscribe();

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = this.passwordInput.nativeElement;

    if (this.showPassword) {
      this.renderer.setAttribute(passwordInput, 'type', 'text');
    } else {
      this.renderer.setAttribute(passwordInput, 'type', 'password');
    }
  }

  OnSignIn() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.signin(email, password)
        .pipe(
          switchMap(({ user: { uid } }) => this.usersService.getUser(uid)),
        )
        .subscribe((res) => {
          this.activeUser = res;
          localStorage.setItem('user', JSON.stringify(res));
          this.activeUser.role === 'ADMIN' ? this.router.navigateByUrl('/admin/dashboard/users') : this.router.navigateByUrl('/public/dashboard')
          this.toastr.success("Welcome! You have successfully logged in");
        
        },
          (error: any) => {
            this.toastr.error("Email or password is invalid!");
          }
        )

    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }


}
