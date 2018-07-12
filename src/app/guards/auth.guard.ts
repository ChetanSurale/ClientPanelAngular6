import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        public angularFireAuth: AngularFireAuth,
        private router: Router
    ) { }

    canActivate(): Observable<boolean> {
        return this.angularFireAuth.authState.map(auth => {
            if(!auth){
                this.router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        });
    }
}
