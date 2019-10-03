import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

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
  noFace: boolean = false
	
	scaleCrop: string = '-/scale_crop/200x200'
	
	effects = {
		effect1: '',
		effect2: '-/exposure/50/-/saturation/50/-/warmth/-30/',
		effect3: '-/filter/vevera/150/',
		effect4: '-/filter/carris/150/',
		effect5: '-/filter/misiara/150/'
	}
	
	activeEffect: string = this.effects.effect1
	busy: boolean = false


  @ViewChild('fileButton', { static: false }) fileButton


  //djabif code
  items: Array<any>;
  
  constructor(

    // smartcode
    private afs: AngularFirestore,
    private storage: AngularFireStorage,

    // codedamn
    public http: Http,
    public afstore: AngularFirestore,
    public user: UserService,
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    public loadingCtrl: LoadingController,) { }


  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
  }
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
	async createPost() {
		this.busy = true

		const image = this.imageURL
		const activeEffect = this.activeEffect
		const desc = this.desc

		this.afstore.doc(`users/${this.user.getUID()}`).update({
			posts: firestore.FieldValue.arrayUnion(`${image}/${activeEffect}`)
		})

	
		
		this.busy = false
		this.imageURL = ""
		this.desc = ""



		const alert = await this.alertController.create({
			header: 'Done',
			message: 'Your post was created!',
			buttons: ['Cool!']
		})

		await alert.present()

		this.router.navigate(['/home'])
	}

	setSelected(effect: string) {
		this.activeEffect = this.effects[effect]
	}

	uploadFile() {
		this.fileButton.nativeElement.click()
	}

	fileChanged(event) {
		
		this.busy = true

		const files = event.target.files
		
		const data = new FormData()
		data.append('file', files[0])
		data.append('UPLOADCARE_STORE', '1')
		data.append('UPLOADCARE_PUB_KEY', 'ccdfa42adf18f626c652')
		
		this.http.post('https://upload.uploadcare.com/base/', data)
		.subscribe(event => {
			console.log(event)
			this.imageURL = event.json().file
			this.busy = false
			this.http.get(`https://ucarecdn.com/${this.imageURL}/detect_faces/`)
			.subscribe(event => {
				this.noFace = event.json().faces == 0
			})
		})
	}


  //djabif

  async getData(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.items = data;
      })
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }
}
