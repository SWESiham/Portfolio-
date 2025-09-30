import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Typed from 'typed.js';
import { HomeService } from '../../core/services/home-service';
import { IHome } from '../../core/models/ihome';
import { CommonModule } from '@angular/common';
import { Services } from '../../core/services/services';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit,OnInit{
  constructor(private _homeService: HomeService,private cdr :ChangeDetectorRef) { };
  
  ngAfterViewInit(): void {
    const options = {
      strings: ['Full Stack Developer','Angular Developer','NodeJS Developer'],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
      showCursor:false
    };

    new Typed('#typed', options);
  }


  ngOnInit(): void {
    this.getInfo();
    this.cdr.detectChanges(); 
    }

  info!: IHome;

  getInfo() {
    this._homeService._getInfoService().subscribe(res => {
      this.info = res;
      console.log(this.info);
    this.cdr.detectChanges(); 
      
    });
    
  }


  downloadCV() {
    if (this.info?.CV) {
      console.error("CV not available!");
    }
    const file = `http://localhost:3000/${this.info.CV}`;
    const link = document.createElement('a');
    link.href = file;
    link.download = this.info.CV.split('/').pop() || 'cv.pdf';
    link.click();
  }

  hireMeClick() {
    const email = this.info.email;
    const subject = encodeURIComponent('Job Opportunity');
    const body = encodeURIComponent('Hello, I am interested in working with you.');
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  sendEmail() {
    const email = this.info.email;
    window.location.href = `mailto:${email}`;
  }
}
 
