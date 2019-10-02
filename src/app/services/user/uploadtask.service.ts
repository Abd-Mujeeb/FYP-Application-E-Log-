import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'

interface user {
    name: string,
    email: string,
    uid: string
}


@Injectable()
export class UploadtaskService {
    private user: user

    constructor(private afAuth: AngularFireAuth) {

    }

    setUser(user: user) {
        this.user = user
    }

    getUID() {

        if(!this.user){
            if(this.afAuth.auth.currentUser) {
                const user = this.afAuth.auth.currentUser
                this.setUser({
                    name,
                    email: user.email,
                    uid: user.uid
                })
                return user.uid
            } else {
                throw new Error("User not logged in")
            }
        } else {
            return this.user.uid
        }
    }
}