import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiences',
  imports: [],
  templateUrl: './experiences.html',
  styleUrl: './experiences.css'
})
export class Experiences implements OnInit{

  constructor(private cdr: ChangeDetectorRef) { }
  http = inject(HttpClient);
  experienceList: any[]=[];
  ngOnInit(): void {
    this.getExperiences()
  }


  getExperiences() {
    this.http.get('http://localhost:4200/experiences').subscribe((res:any) => {
      this.experienceList = res;
      this.cdr.detectChanges();
    })
  }

  

}
