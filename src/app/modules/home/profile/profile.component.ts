import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../@core/models/user.model';
import { SessionService } from '../../../@core/services/session.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;

  userProfile: User;
  

  constructor(private sessionService: SessionService,
    private userService: UserService,
    ) {
    this.user = this.sessionService.getItem('auth-user');
  }

  ngOnInit(): void {
    this.getUserById(this.user.id);
  }

  

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe(res => {
      this.userProfile = res
      console.log(this.userProfile);

    })
  }

}
