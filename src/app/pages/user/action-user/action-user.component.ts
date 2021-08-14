import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'ngx-action-user',
  templateUrl: './action-user.component.html',
  styleUrls: ['./action-user.component.scss']
})
export class ActionUserComponent implements OnInit {

  @Input() action: any;
  @Input() user: any;

  isSubmitted: boolean = false;
  formUser: FormGroup;
  lstUser: any[] = [];

  

  constructor(private modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.action) {
      this.formUser = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', Validators.required],
        birthday: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        address: ['', Validators.required],
        status: [null, Validators.required],
      });
    } else {
      this.formUser = this.fb.group({
        id: [this.user.id],
        username: [this.user.username, Validators.required],
        password: [this.user.password, Validators.required],
        name: [this.user.name, Validators.required],
        email: [this.user.email, Validators.required],
        birthday: [this.user.birthday, Validators.required],
        phoneNumber: [this.user.phoneNumber, Validators.required],
        address: [this.user.address, Validators.required],
        status: [this.user.status, Validators.required],
      });
    }
  }

  close(status = true) {
    this.modal.close(status);
  }

  get f() {
    return this.formUser.controls;
  }

  processSaveOrUpdate() {
    this.isSubmitted = true;
    if (this.formUser.valid) {
      this.spinner.show();

      
      if (this.action) {
        this.userService.createUser(this.formUser.value).subscribe(
          data => {
            this.toastr.success('Thêm mới thành công');
            this.close();
          });
      }
      else {
        
          this.userService.editUser(this.formUser.value, this.user.id).subscribe(data => {
            this.toastr.success('Cập nhật thành công !');
            this.close();
          })
      }
    }
  }

 
}
