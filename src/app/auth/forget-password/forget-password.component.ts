import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['../auth.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  loginForm!: any;

  constructor(
    private authService: AuthService, private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router,

  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  forgetPassword() {
    this.authService.forget(this.loginForm.value.email).subscribe((res) => {
      this.toastr.success('Reset link has been sent to your email')
      this.router.navigateByUrl('/auth/login')
    })
  }

}
