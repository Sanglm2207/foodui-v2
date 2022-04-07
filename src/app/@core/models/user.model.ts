import { Observable } from 'rxjs';

export interface User {
  id?: number;
  name?: string;
  avatar?: string;
  birthday?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  status?: boolean;
}

// export interface Contacts {
//   user: User;
//   type: string;
// }

// export interface RecentUsers extends Contacts {
//   time: number;
// }

// export abstract class UserData {
//   abstract getUsers(): Observable<User[]>;
//   abstract getContacts(): Observable<Contacts[]>;
//   abstract getRecentUsers(): Observable<RecentUsers[]>;
// }
