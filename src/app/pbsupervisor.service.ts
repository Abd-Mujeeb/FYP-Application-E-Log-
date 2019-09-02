import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

interface pbsupervisor  {
  name: string
  email: string,
  uid: string
}


@Injectable({
  providedIn: 'root'
})
export class pbsupervisorService {
  private pbsupervisor : pbsupervisor 

    constructor(private afAuth: AngularFireAuth) {

    }

    setUser(pbsupervisor  : pbsupervisor ) {
        this.pbsupervisor  = pbsupervisor 
    }

    getUID() {

        if(!this.pbsupervisor){
            if(this.afAuth.auth.currentUser) {
                const pbsupervisor = this.afAuth.auth.currentUser
                this.setUser({
                    name,
                    email: pbsupervisor.email,
                    uid: pbsupervisor.uid
                })
                return pbsupervisor.uid
            } else {
                throw new Error("User not logged in")
            }
        } else {
            return this.pbsupervisor.uid
        }
    }
}
