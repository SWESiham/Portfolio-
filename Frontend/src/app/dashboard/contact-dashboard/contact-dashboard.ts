import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ContactService } from '../../core/services/contact-service';
import { IContact } from '../../core/models/icontact';

@Component({
  selector: 'app-contact-dashboard',
  imports: [CommonModule],
  templateUrl: './contact-dashboard.html',
  styleUrl: './contact-dashboard.css'
})
export class ContactDashboard {

  constructor(private contactService:ContactService,private cdr: ChangeDetectorRef) { }
  
  contactList: IContact[] = [];
  ngOnInit(): void {
     this.getContact()
  }

  getContact() {
    this.contactService.retrieveContact().subscribe({
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
  

  deleteContact(id: string) {
    this.contactService._deleteContact(id).subscribe({
      next: (res) => {
        console.log(res);
      }, error: (err) => {
        console.log(err);
      }, complete: () => {
        console.log("complete delete the contact");
      }
    })
  }

  replyContact(contact:IContact) {
    const email = contact.email;
    window.location.href = `mailto:${email}`;
  }
}

