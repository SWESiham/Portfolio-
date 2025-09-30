import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AboutService } from '../../core/services/about-service';
import { IAbout } from '../../core/models/iabout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {

  constructor(private _aboutServie: AboutService, private cdr: ChangeDetectorRef) { };

  ngOnInit(): void {
    this.getData();
  }
  About!: IAbout;

  getData() {
    this._aboutServie._retrieveData().subscribe({
      next: (res: IAbout) => {
        const lastAbout = res.about[res.about.length - 1]; 
        
        this.About = {
          about: [lastAbout],      
          experience: res.experience
        };
  
        this.cdr.detectChanges(); 
      },
      error(err) {
        console.error(err);
      },
      complete: () => {
        console.log("Data comes from about successfully");
      }
    });
  }
  
  
}