import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import {UserService} from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username

  constructor(private afs: AngularFirestore, private user: UserService) { 
    const name = afs.doc(`users/${user.getUID()}`)
    this.username = name.valueChanges()
  }

    
  ngOnInit() {
  }

}

