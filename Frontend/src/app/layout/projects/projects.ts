import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project-service';
import { IProject } from '../../core/models/iproject';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit {

  constructor(private cdr: ChangeDetectorRef, private projectSer: ProjectService) { }
  private http = inject(HttpClient)
  projectsList: IProject[] = []
  
  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectSer._retreiveProject().subscribe({
      next: (res: any) => {
        this.projectsList = res;
        console.log(this.projectsList);
        this.cdr.detectChanges();
  
      }, error(err) {
        console.error(err);
        
      }, complete() {
        console.log("completed");
        
      }
    })
  }
}
