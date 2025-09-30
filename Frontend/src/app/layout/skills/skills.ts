import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SkillService } from '../../core/services/skill-service';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills implements OnInit{
  constructor(private skillService:SkillService,private cdr: ChangeDetectorRef) { }
  
  skillsList: any[] = [];
  ngOnInit(): void {
     this.getSkills()
  }

  getSkills() {
    this.skillService.getSkills().subscribe((res:any) => {
      this.skillsList = res;
      console.log(this.skillsList);
      this.cdr.detectChanges();
    })
  }
  
}
