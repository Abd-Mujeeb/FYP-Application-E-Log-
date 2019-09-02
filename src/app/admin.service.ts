import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

interface admin {
  name: string
  email: string
  uid: string
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private admin: admin

    constructor(private afAuth: AngularFireAuth) {

    }

    setUser(admin : admin) {
        this.admin = admin
    }

    getUID() {

        if(!this.admin){
            if(this.afAuth.auth.currentUser) {
                const admin = this.afAuth.auth.currentUser
                this.setUser({
                    name,
                    email: admin.email,
                    uid: admin.uid
                })
                return admin.uid
            } else {
                throw new Error("User not logged in")
            }
        } else {
            return this.admin.uid
        }
    }
}
