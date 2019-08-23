import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';

export interface Image {
  id: string;
  image: string;
}

@Component({
  selector: 'app-uploadtask',
  templateUrl: './uploadtask.page.html',
  styleUrls: ['./uploadtask.page.scss'],
})


export class UploadtaskPage implements OnInit {

  // from smartcodehub

  url: any;
  newImage: Image = {
    id: this.afs.createId(), image: ''
  }
  loading: boolean = false;;

  // codedamn

  imageURL: string
  desc: string

  @ViewChild('fileButton', { static: false }) fileButton

  constructor(

    // smartcode
    private afs: AngularFirestore,
    private storage: AngularFireStorage,

    // codedamn
    public http: Http,
    public afstore: AngularFirestore,
    public user: UserService) { }


  ngOnInit() {
  }

  // smartcode
  uploadImage(event) {
    this.loading = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      // For Preview Of Image
      reader.onload = (e: any) => { // called once readAsDataURL is completed
        this.url = e.target.result;

        // For Uploading Image To Firebase
        const fileraw = event.target.files[0];
        console.log(fileraw)
        const filePath = '/Image/' + this.newImage.id + '/' + 'Image' + (Math.floor(1000 + Math.random() * 9000) + 1);
        const result = this.SaveImageRef(filePath, fileraw);
        const ref = result.ref;
        result.task.then(a => {
          ref.getDownloadURL().subscribe(a => {
            console.log(a);

            this.newImage.image = a;
            this.loading = false;
          });

          this.afs.collection('Image').doc(this.newImage.id).set(this.newImage);
        });
      }, error => {
        alert("Error");
      }

    }
  }



  SaveImageRef(filePath, file) {

    return {
      task: this.storage.upload(filePath, file)
      , ref: this.storage.ref(filePath)
    };
  }



  // codedamn
  createPost() {
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


    this.http.post('https://upload.uploadcare.com/base/', data)
      .subscribe(event => {
        console.log(event)
        this.imageURL = event.json().file
      })
  }
}

