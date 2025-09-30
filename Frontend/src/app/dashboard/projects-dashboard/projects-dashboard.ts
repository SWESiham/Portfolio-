import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../core/services/project-service';
import { IProject } from '../../core/models/iproject';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projects-dashboard.html',
  styleUrl: './projects-dashboard.css'
})
export class ProjectsDashboard implements OnInit {

  constructor(private _projSer: ProjectService, private cdr: ChangeDetectorRef) { };
  @ViewChild('skillFileInput') fileInput!: ElementRef;

  projectsList!: IProject[];
  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this._projSer._retreiveProject().subscribe({
      next: (res: any) => {
        this.projectsList = res;
        console.log(this.projectsList);
        this.cdr.detectChanges();
      }, error(err) {
        console.error(err);

      }, complete() {
        console.log("completed");

      }
    });
  }



  formGroup: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    language: new FormArray([]),
    projectImage: new FormControl(null),
    githubUrl: new FormControl(''),
    demo: new FormControl(''),
    status: new FormControl(''),
    category: new FormControl(''),
  });


  get languageArray(): FormArray {
    return this.formGroup.get('language') as FormArray;
  }


  addLanguage() {
    this.languageArray.push(new FormControl(''));
  }


  removeLanguage(index: number) {
    this.languageArray.removeAt(index);
  }

  addProject() {
    let formData = new FormData();
    formData.append("title", this.formGroup.value.title);
    formData.append("description", this.formGroup.value.description);
    formData.append("githubUrl", this.formGroup.value.githubUrl);
    formData.append("demo", this.formGroup.value.demo);
    formData.append("status", this.formGroup.value.status);
    formData.append("category", this.formGroup.value.category);

    formData.append("language", JSON.stringify(this.formGroup.value.language));


    if (this.formGroup.value.projectImage)
      formData.append("projectImage", this.formGroup.value.projectImage);


    this._projSer._addNewProject(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.getProjects();
        this.formGroup.reset();
      },
      error: (err) => {
        console.error(err)
      }, complete: () => {
        console.log("project added !!!");
        
      }
    });
  }

  deleteProject(id: string) {
    this._projSer._deleteProject(id).subscribe({
      next: (res) => {
        console.log(res);
        this.projectsList = this.projectsList.filter(p => p._id !== id);
        this.getProjects();
        this.formGroup.reset();
      },
      error: (err) => {
        console.error(err)
      }, complete: () => {
        console.log("project added !!!");
        
      }
      });
  }




  isEdit:boolean = false;
  id!: string;
    editProject(project: IProject) {
      this.isEdit = true;
      this.id = project._id; 
      this.languageArray.clear(); //n3ml leh clear 3l4an lama n3rd yb2 mafe4 haga tany
      project.language.forEach(lang => {
        this.languageArray.push(new FormControl(lang));
      }); // y3rd kol el lang
      this.formGroup.patchValue({
        'title': project.title,
        'description': project.description,
        'githubUrl': project.githubUrl,
        'demo': project.demo,
        'status': project.status,
        'category': project.category,
        // 'language': project.language,
        'projectImage': null
      });
  
    }
    
    updateProject() {
      let formData = new FormData();
      formData.append('title', this.formGroup.value.title);
      formData.append('description', this.formGroup.value.description);
      formData.append('githubUrl', this.formGroup.value.githubUrl);
      formData.append('demo', this.formGroup.value.demo);
      formData.append('status', this.formGroup.value.status);
      formData.append('category', this.formGroup.value.category);
      formData.append("language", JSON.stringify(this.formGroup.value.language));

      if(this.formGroup.value.projectImage)
        formData.append('projectImage', this.formGroup.value.projectImage);
      
      this._projSer._updateProject(formData, this.id).subscribe({
        next: (res) => {
          console.log(res);
          this.projectsList = this.projectsList.map(p => (p._id === this.id) ? res : p);
          this.isEdit = false;
          this.getProjects();
          this.formGroup.reset();
          if (this.fileInput) {
            this.fileInput.nativeElement.value = '';
          }
        }, error: (err) => {
          console.log(err);
        }, complete: () => {
          console.log("complete");
        }
      });
    }

  onChangeImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.patchValue({
        projectImage: file
      })
    }
  }
}
