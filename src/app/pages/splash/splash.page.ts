import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  splash = true;

  constructor( private router: Router,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,) { }

  ngOnInit() {

     setTimeout(() => this.splash = false, 8000, this.goto());
  }

 
  async goto(){
      await this.afAuth.auth.onAuthStateChanged(user => 
      {
        if (user) {
          console.log("testing mau kh nda");
         user.uid;
          this.firestore.doc(`users/${user.uid}`).valueChanges().pipe(
            take(1)
          ).subscribe(userData => {
            
              this.router.navigateByUrl('/home-student');
              
            
        })
      } else {
        this.router.navigateByUrl('/login');
        console.log('no user, maksudnya last user logout lapas ia pakai the app');
        return of(null);
      }



    });
  
   

  }

}
