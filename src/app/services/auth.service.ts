import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { resolve, reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public angularFireAuth: AngularFireAuth
  ) { }

  // Login User
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
          err => reject(err));
    })
  }

  //check user status
  getAuth(){
    return this.angularFireAuth.authState.map(auth => auth);
  }

  // logout user
  logout(){
    this.angularFireAuth.auth.signOut();
  }
}
