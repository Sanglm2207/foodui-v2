
export class UserModel {
  username: string;
  email: string;
  password: string;
  name: string;
  birthday: string;
  phoneNumber: string;
  address: string;
  status: boolean;
  roles: String[];

  constructor(
    username: string,
    email: string,
    password: string,
    name: string,
    birthday: string,
    phoneNumber: string,
    address: string,
    status: boolean,
    roles: string[]
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.name = name;
    this.birthday = birthday;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.status = status;
    this.roles = roles;
  }


}
