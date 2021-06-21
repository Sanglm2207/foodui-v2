import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';
import {TokenService} from '../../@core/services/_service/auth/token.service';
import {AuthService} from '../../@core/services/_service/auth/auth.service';
import {FormProviderRequest} from '../../@core/utils/form-provider-req';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  socialUser: SocialUser;
  userLogged: SocialUser;
  form: FormGroup;
  isSubmitted = false;
  roles: string[] = [];
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.disables('none');
    this.initForm();
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenService.getUser().roles;
    }
  }

  disables(display: string) {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = display;
    }
  }

  initForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.spinner.show();
      this.authService.login(this.form.value).subscribe(
        data => {
          console.log(data);
          
          this.tokenService.saveToken(data.accessToken);
          this.tokenService.saveUser(data);
          this.spinner.hide();
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenService.getUser().roles;
          this.router.navigate(['/pages/dashboard']);
        },
        err => {
          this.errorMessage = err.error.message;
          this.toastr.error(this.errorMessage);
          this.spinner.hide();
          this.isLoginFailed = true;
        }

        // if (res.code === '200') {
        //    console.log(res);
        //   this.spinner.hide();
        //   this.tokenService.setToken(res.data.jwt);
        //   this.roles = this.tokenService.getUser().roles;
        //   this.router.navigate(['/pages/dashboard']);
        // } else {
        //   this.toastr.error(res.message);
        //   this.spinner.hide();
        // }
      );
    }
  }

  get f() {
    return this.form.controls;
  }
}
