import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SkillService } from '../../core/services/skill-service';
import { CommonModule } from '@angular/common';
import { ISkill } from '../../core/models/iskill';

@Component({
  selector: 'app-skills-dashboard',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './skills-dashboard.html',
  styleUrl: './skills-dashboard.css'
})
export class SkillsDashboard implements OnInit{
  constructor(private _skillService: SkillService, private cdr: ChangeDetectorRef) { };
  @ViewChild('skillFileInput') fileInput!: ElementRef;
  skillsList: ISkill[] = [];

  isEdit: boolean = false;
  id!: string;
  ngOnInit(): void {
     this.getSkills()
  }

  formGroup: FormGroup = new FormGroup({
    title: new FormControl(''),
    skillImage: new FormControl(null),
  });

  newSkill() {
    let formData = new FormData();
    formData.append('title', this.formGroup.value.title);
    if(this.formGroup.value.skillImage)
      formData.append('skillImage', this.formGroup.value.skillImage);
    
  
    this._skillService._addNewSkills(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.skillsList.push(res);
        this.formGroup.reset();
  
        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("complete");
      }
    });
  }
  
  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.patchValue({
        skillImage: file
      })
    }
    
  }
 

  getSkills() {
    this._skillService.getSkills().subscribe((res:any) => {
      this.skillsList = res;
      console.log(this.skillsList);
      this.cdr.detectChanges();
    })
  }

  
  deleteSkill(id:string) {
    this._skillService._deleteSkill(id).subscribe({
      next: (res) => {
        console.log(res);
        this.skillsList = this.skillsList.filter(s => s._id !== id );
      }, error: (err) => {
        console.log(err);
      }, complete: () => {
        console.log("complete");
      }
    })
  }

  editSkill(skill: ISkill) {
    this.isEdit = true;
    this.id = skill._id; 
    this.formGroup.patchValue({
      'title': skill.title,
      'skillImage': null
    });

  }
  
  updateSkill() {
    let formData = new FormData();
    formData.append('title', this.formGroup.value.title);
    if(this.formGroup.value.skillImage)
      formData.append('skillImage', this.formGroup.value.skillImage);
    
    this._skillService._updateSkill(formData, this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.skillsList = this.skillsList.map(s => (s._id === this.id) ? res : s);
        this.isEdit = false;
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
  

}

