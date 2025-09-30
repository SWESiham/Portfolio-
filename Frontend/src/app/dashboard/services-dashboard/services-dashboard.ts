import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Services } from '../../core/services/services';
import { IServices } from '../../core/models/iservices';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-dashboard',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './services-dashboard.html',
  styleUrl: './services-dashboard.css'
})
export class ServicesDashboard implements OnInit {

  constructor(private _serSer: Services, private cdr: ChangeDetectorRef) { };

  servicesList: IServices[] = [];
  isEdit: boolean = false;
  id!: string
  ngOnInit(): void {
    this.getServices()
  }

  formGroup: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    serviceImage: new FormControl(null),
  })

  newService() {
    let formData = new FormData();
    formData.append("title", this.formGroup.value.title);
    formData.append("description", this.formGroup.value.description);
    formData.append("serviceImage", this.formGroup.value.serviceImage);
    this._serSer._addService(formData).subscribe({
      next: (res) => {
        this.servicesList.push(res);
        this.formGroup.reset();
        console.log(res);
      }, error: (err) => {
        console.log(err);
      }, complete: () => {
        console.log("complete");
      }
    });

  }

  getServices() {
    this._serSer._getService().subscribe((res: any) => {
      this.servicesList = res;
      console.log(this.servicesList);
      this.cdr.detectChanges();
    })
  }

  deleteService(id: string) {
    this._serSer._deleteService(id).subscribe({
      next: (res) => {
        console.log(res);
        this.servicesList = this.servicesList.filter(s => s._id !== id);
      }, error: (err) => {
        console.log(err);
      }, complete: () => {
        console.log("complete");
      }
    })
  }

  editService(service: IServices) {
    this.isEdit = true;
    this.id = service._id;
    this.formGroup.patchValue({
      title: service.title,
      description: service.description
    });
  }



  updateService() {
    let formData = new FormData();
    formData.append('title', this.formGroup.value.title);
    formData.append('description', this.formGroup.value.description);
    if (this.formGroup.value.serviceImage) {
      formData.append("serviceImage", this.formGroup.value.serviceImage);
    }
    this._serSer._updateService(formData, this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.servicesList = this.servicesList.map(s => (s._id === this.id) ? res : s);
        this.isEdit = false;
        this.formGroup.reset();
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
        serviceImage: file
      })
    }
  }
}
