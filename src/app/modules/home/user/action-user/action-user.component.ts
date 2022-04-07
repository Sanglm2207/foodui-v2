import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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


  
  constructor(public dialogRef: MatDialogRef<ActionUserComponent>,
              private fb: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService
) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    if (this.action) {
      this.formUser = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required],
        name: ['', Validators.required],
        avatar: ["https://firebasestorage.googleapis.com/v0/b/food-v2.appspot.com/o/107043452_2652387545088968_6274293042110235110_n.jpg"],
        birthday: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        address: ['', Validators.required]
      });
    
    }
  }

  get f() {
    return this.formUser.controls;
  }

  processSaveOrUpdate() {
    this.isSubmitted = true;
    if (this.formUser.valid) {
      if (this.action) {
        this.userService.createUser(this.formUser.value).subscribe(
          data => {
            this.toastr.success('Thêm mới thành công');
            this.close();
          });
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
