import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, Auth, User, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Role, UnifiUser } from '../models/user';
const unifiUser:UnifiUser = new UnifiUser();

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  //auth: Auth = inject(Auth);

  //private provider = new GoogleAuthProvider();
  constructor(private router: Router , private _auth:Auth) { }

  userLogued!: User;
 error:string = "";
   async loginService(email:string, password:string):Promise<string> {
   /* signInWithPopup(this.auth, this.provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        this.router.navigate(['map']);
        return credential;
    })*/
   return await signInWithEmailAndPassword(this._auth, email, password)
  .then((userCredential) => {
    unifiUser.userInfo = userCredential.user;
    userCredential.user.getIdTokenResult(true) .then((idTokenResult) => {
      console.log(idTokenResult.claims['role']);
      unifiUser.role = idTokenResult.claims['role'] as Role;
      console.log(unifiUser);
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

    this.router.navigate(['map']);
    return "";
  })
  .catch((error) => {
     this.error = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    return error.code;
  });
  //return this.error;
}


getUserLogued(){
  return unifiUser;
}

async getRole():Promise<string>{


  if(unifiUser.userInfo === undefined) {return Role.NoUser;}

  return await unifiUser.userInfo.getIdTokenResult(true) .then((idTokenResult) => {
    unifiUser.role = idTokenResult.claims['role'] as Role;
    return unifiUser.role;
  })
  .catch((error) => {
    console.log(error);
    return Role.NoUser;
  });

  /*if(this.unifiUser.role !== undefined ){
    return this.unifiUser.role;
  }
  else return Role.NoUser;*/

}

logoutService() {
  signOut(this._auth).then(() => {
      this.router.navigate(['login'])
      console.log('signed out');
  }).catch((error) => {
      console.log('sign out error: ' + error);
  })
}


}
