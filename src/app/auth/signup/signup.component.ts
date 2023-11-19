import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: any;
  showPassword: boolean = false;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private usersService: UserService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,

  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['CUSTOMER'],
      status: ['ENABLED']
    });
  }

  register() {
    if (this.signupForm.valid) {
      const { firstName, lastName, email, password, role, status } = this.signupForm.value;
      this.authService.signup(email, password)
        .pipe(
          switchMap(({ user: { uid } }) =>
            this.usersService.addUser({ uid, email, firstName: firstName, lastName: lastName, displayName: firstName + " " + lastName, role: role, status: status })
          ),
        )
        .subscribe((res) => {
          this.router.navigateByUrl('/admin/dashboard/users');
        }),
        (err: any) => {
          this.toastr.error(err.code);
        }
    }
    else {
      this.signupForm.markAllAsTouched();
    }
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

}
