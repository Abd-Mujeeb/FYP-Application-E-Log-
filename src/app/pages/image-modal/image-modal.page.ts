import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
 
  image: any;

  @ViewChild('slider', { read: ElementRef, static: false })slider: ElementRef;

  
  zoom(zoomIn: boolean) {
    let zoom = this.slider.nativeElement.swiper.zoom;
    if(zoomIn){
      zoom.in();
    } else {
      zoom.out();
    }
  }

  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  };

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.image = this.navParams.get('image');

  }


  close(){
    this.modalController.dismiss();
  }
}
