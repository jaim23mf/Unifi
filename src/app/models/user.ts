import { User } from "@angular/fire/auth";

export class UnifiUser{

    role: Role | null;
    userInfo:User;
}

export enum Role {
    NoUser = "unregistred",
    User = "user",
    SuperUser = "superuser",
    Admin = "admin"
  }
  