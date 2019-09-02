import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

interface companysupervisor  {
  name: string
  email: string
  uid: string
}


@Injectable({
  providedIn: 'root'
})
export class companysupervisorService {
  private companysupervisor : companysupervisor 

    constructor(private afAuth: AngularFireAuth) {

    }

    setUser(companysupervisor  : companysupervisor ) {
        this.companysupervisor  = companysupervisor 
    }

    getUID() {

        if(!this.companysupervisor){
            if(this.afAuth.auth.currentUser) {
                const companysupervisor = this.afAuth.auth.currentUser
                this.setUser({
                    name,
                    email: companysupervisor.email,
                    uid: companysupervisor.uid
                })
                return companysupervisor.uid
            } else {
                throw new Error("User not logged in")
            }
        } else {
            return this.companysupervisor.uid
        }
    }
}
