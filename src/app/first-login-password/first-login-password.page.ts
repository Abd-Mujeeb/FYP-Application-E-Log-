import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-first-login-password',
  templateUrl: './first-login-password.page.html',
  styleUrls: ['./first-login-password.page.scss'],
})
export class FirstLoginPasswordPage implements OnInit {

  overlayHidden: boolean = false;

  constructor() { }

  public hideOverlay(){
    this.overlayHidden = true;  
  }

  ngOnInit() {
  }

}
