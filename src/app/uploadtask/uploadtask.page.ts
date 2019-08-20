import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';


@Component({
  selector: 'app-uploadtask',
  templateUrl: './uploadtask.page.html',
  styleUrls: ['./uploadtask.page.scss'],
})
export class UploadtaskPage implements OnInit {

  imageURL: string
  desc: string

  @ViewChild('fileButton', {static: false}) fileButton

  constructor(
    public http: Http,
    public afstore: AngularFirestore,
    public user: UserService) { }

  ngOnInit() {
  }

  createPost(){
    const image = this.imageURL
    const desc = this.desc


    this.afstore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion({
        image,
        desc
      })
    })
  }


  uploadFile() {
    this.fileButton.nativeElement.click()
  }

  fileChanged(event) {
    const files = event.target.files

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', 'ccdfa42adf18f626c652')
    

    this.http.post('https://upload.uploadcare.com/base/' , data)
    .subscribe(event => {
      console.log(event)
      this.imageURL = event.json().file
    })
  }
}

