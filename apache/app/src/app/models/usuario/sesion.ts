import { User } from '.';

export class Sesion {
  token: string;
  timestamp: number;
  user: User;
  constructor () {
    this.user = new User();
    this.timestamp = (new Date()).getTime();
  }
}