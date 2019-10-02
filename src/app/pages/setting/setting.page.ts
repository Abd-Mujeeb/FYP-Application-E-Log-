import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private theme: ThemeService, private sanitizer: DomSanitizer) { }

  status = false;

  tstChange(){
    if(this.status) {
      this.enableDark();
    } else {
      this.enableLight();
    }
   }
  
   enableDark(){
     this.theme.enableDark();
   }

   enableLight(){
     this.theme.enableLight();
   }


  ngOnInit() {
  }

}

