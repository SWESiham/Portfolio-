import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeService } from '../../core/services/home-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ISkill } from '../../core/models/iskill';
import { IProject } from '../../core/models/iproject';
import { IContact } from '../../core/models/icontact';
import { ProjectService } from '../../core/services/project-service';
import { SkillService } from '../../core/services/skill-service';
import { ContactService } from '../../core/services/contact-service';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  constructor(private _homeService: HomeService, private cdr: ChangeDetectorRef,private projectSer: ProjectService, private skillSer: SkillService, private contactSer : ContactService ) { };

  contactList!: IContact[];
  skillsList!: ISkill[];
  projectsList!: IProject[];
  ngOnInit(): void {
    this.getData();
    this.getContact();
    this.getSkills();
    this.getProjects();
  }

  getContact() {
    this.contactSer.retrieveContact().subscribe({
      next: (res) => {
        this.contactList = res;        
        this.cdr.detectChanges();
        console.log(this.contactList);
      }, error: (err) => {
        console.log(err);
      }, complete: () => {
        console.log("complete");
      }
    });
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
      });
  }
  
  
  getSkills() {
    this.skillSer.getSkills().subscribe((res:any) => {
      this.skillsList = res;
      console.log(this.skillsList);
      this.cdr.detectChanges();
    })
  }

  

  savedCvName!: string;

  formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    githubURL: new FormControl(''),
    linkedin: new FormControl(''),
    email: new FormControl(''),
    CV: new FormControl(null),
  })
  

  id!: string
  getData() {
    this._homeService._getInfoService().subscribe({
      next: (res: any) => {
        console.log(res._id);
        this.id = res._id;
        this.formGroup.patchValue({
          name: res.name,
          title: res.title,
          description: res.description,
          githubURL: res.githubURL,
          linkedin: res.linkedin,
          email: res.email,
          CV: res.CV
        });
        this.savedCvName = res.CV;
        this.cdr.detectChanges();

      }

    });
  
  
  }


  updateData() {

    let formData = new FormData();
    formData.append('name', this.formGroup.value.name);
    formData.append('title', this.formGroup.value.title);
    formData.append('description', this.formGroup.value.description);
    formData.append('githubURL', this.formGroup.value.githubURL);
    formData.append('linkedin', this.formGroup.value.linkedin);
    formData.append('email', this.formGroup.value.email);
    if (this.formGroup.value.CV instanceof File) {
      formData.append('cvfile', this.formGroup.value.CV);
    }

    console.log(this.id);

    this._homeService._updateInfoService(formData, this.id).subscribe({
      next: (res) => {
        console.log(res)
      },
      error(err) {
        console.log(err)
      }, complete() {
        console.log('complete')
      }
    })
  }

  onChange(event: any) {
    if (event.target.files.length > 0) {
      const cv = event.target.files[0];
      this.formGroup.patchValue({
        CV: cv
      });

      this.savedCvName =cv.name;
    }
  }






}


