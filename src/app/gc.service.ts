import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

interface gc  {
  name: string
  email: string,
  uid: string
}


@Injectable({
  providedIn: 'root'
})

export class gcService {
  private gc : gc 

    constructor(private afAuth: AngularFireAuth) {

    }

    setUser(gc  : gc ) {
        this.gc  = gc 
    }

    getUID() {

        if(!this.gc){
            if(this.afAuth.auth.currentUser) {
                const gc = this.afAuth.auth.currentUser
                this.setUser({
                    name,
                    email: gc.email,
                    uid: gc.uid
                })
                return gc.uid
            } else {
                throw new Error("User not logged in")
            }
        } else {
            return this.gc.uid
        }
    }
}
