import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../core/services/contact-service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact{

  constructor(private _contactService: ContactService) { };

  
  formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    subject: new FormControl(''),
    message: new FormControl('')
  });

  send() {
    this._contactService._addContact(this.formGroup.value).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
      complete: () => console.log("Sended Successfully")
    });



  }
  // SendEmail() {
  //   const email = this.formGroup.value.email;
  //   const subject = this.formGroup.value.subject;
  //   const message = this.formGroup.value.message;
  //   window.location.href = `mailto:${email}?subject=${subject}&body=${message}`;
  // }



  /**name:string,
    phoneNumber: string,
    email:string,
    subject: string,
    message:string */
}
