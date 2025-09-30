import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AboutService } from '../../core/services/about-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IAbout } from '../../core/models/iabout';

@Component({
  selector: 'app-about-dashboard',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './about-dashboard.html',
  styleUrl: './about-dashboard.css'
})
export class AboutDashboard implements OnInit{


  constructor(private aboutSer: AboutService,private cdr :ChangeDetectorRef) { };
  experienceList!: IAbout['experience'];
  isEdit: boolean = false;

  aboutFormGroup: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    yearsOfExperience: new FormControl(''),
    jobTitle: new FormControl(''),
    jobTitleImage: new FormControl(null),
  });
  
  experienceFormGroup: FormGroup = new FormGroup({
    companyName: new FormControl(''),
    companyURL: new FormControl(''),
    companyImgURL: new FormControl(null),
    companyJobTitle: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(null),
  });

  ngOnInit(): void {
    this.getAboutData();
    this.retreiveExperience();
    // this.getExperienceData();
  }
  id!: string
  getAboutData() {    
    this.aboutSer._retrieveAboutData().subscribe({
      next: (res: any) => {
        console.log(res);
        const last = res[res.length - 1]; 
        this.id = last._id;
        this.aboutFormGroup.patchValue({
          title: last.title,
          description: last.description,
          yearsOfExperience: last.yearsOfExperience,
          jobTitle: last.jobTitle,
          jobTitleImage: last.jobTitleImage
        });
       this.cdr.detectChanges();
      }

    });
  
  
  }
  getExperienceData() {    
    this.aboutSer._retrieveExperienceData().subscribe({
      next: (res: any) => {
        console.log(res);
        // this.id = res[0]._id;
        this.experienceFormGroup.patchValue({
          companyName: res[0].companyName,
          companyURL: res[0].companyURL,
          companyImgURL: res[0].companyImgURL,
          companyJobTitle: res[0].companyJobTitle,
          startDate:res[0].startDate,
          endDate:res[0].endDate
        });
       this.cdr.detectChanges();
      }

    });
  }
  retreiveExperience() {
    this.aboutSer._retrieveExperienceData().subscribe({
      next: (res) => {
        this.experienceList = res;
        console.log(res)
      },
      error(err) {
        console.log(err)
      }, complete() {
        console.log('complete')
      }
    })
    this.cdr.detectChanges();
  }
  updateAboutData() {
    let formData = new FormData();
    formData.append('title', this.aboutFormGroup.value.title);
    formData.append('description', this.aboutFormGroup.value.description);
    formData.append('yearsOfExperience', this.aboutFormGroup.value.yearsOfExperience);
    formData.append('jobTitle', this.aboutFormGroup.value.jobTitle);
    if (this.aboutFormGroup.value.jobTitleImage) {
      formData.append('jobTitleImage', this.aboutFormGroup.value.jobTitleImage);
    }

    console.log(this.id);

    this.aboutSer.UpdateAboutData(formData, this.id).subscribe({
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

  onFileChange(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (controlName === 'jobTitleImage') {
        this.aboutFormGroup.patchValue({ jobTitleImage: file });
      } else if (controlName === 'companyImgURL') {
        this.experienceFormGroup.patchValue({ companyImgURL: file });
      }
    }
  }
  


  editExperience(exp: any) {
    this.isEdit = true;
    this.id = exp._id;
  
    this.experienceFormGroup.patchValue({
      companyName: exp.companyName,
      companyURL: exp.companyURL,
      companyJobTitle: exp.companyJobTitle,
      startDate: exp.startDate,
      endDate: exp.endDate,
      companyImgURL: null
    });
  }
  
  updateExperience() {
    let formData = new FormData();
    formData.append("companyName", this.experienceFormGroup.value.companyName);
    formData.append("companyURL", this.experienceFormGroup.value.companyURL);
    formData.append("companyJobTitle", this.experienceFormGroup.value.companyJobTitle);
    formData.append("startDate", this.experienceFormGroup.value.startDate);
    formData.append("endDate", this.experienceFormGroup.value.endDate);
  
    if (this.experienceFormGroup.value.companyImgURL)
      formData.append("companyImgURL", this.experienceFormGroup.value.companyImgURL);
  
    this.aboutSer.UpdateExperienceData(formData, this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.isEdit = false;
        this.getExperienceData(); 
        this.experienceFormGroup.reset();
      },
      error: (err) => console.error(err),
      complete: () => console.log("Experience updated!")
    });
  }
  deleteExperience(id: string) {
    this.aboutSer.deleteExperienceData(id).subscribe({
      next: (res) => {
        console.log(res);
        this.experienceList = this.experienceList.filter(e => e._id !== id);
        this.getExperienceData();
      },
      error: (err) => console.error(err),
      complete: () => console.log("Experience deleted!")
    });
  }
  addExperience() {
    let formData = new FormData();
    formData.append("companyName", this.experienceFormGroup.value.companyName);
    formData.append("companyJobTitle", this.experienceFormGroup.value.companyJobTitle);
    formData.append("companyURL", this.experienceFormGroup.value.companyURL);
    formData.append("startDate", this.experienceFormGroup.value.startDate);
    formData.append("endDate", this.experienceFormGroup.value.endDate);
  
    if (this.experienceFormGroup.value.companyImgURL)
      formData.append("companyImgURL", this.experienceFormGroup.value.companyImgURL);
  
    this.aboutSer.addExperienceData(formData).subscribe({
      next: () => {
        this.getExperienceData();
        this.experienceFormGroup.reset();
      }
    });
  }
}
