import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Services as servicesService} from '../../core/services/services';
import { IServices } from '../../core/models/iservices';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit{
  constructor(private serviceSer: servicesService, private cdr: ChangeDetectorRef) { };
  

  ngOnInit(): void {
   this.retrieveServices();
  }

  services:IServices[]=[];

  retrieveServices() {
    this.serviceSer._getService().subscribe({
      next: (res: IServices[]) => {
        this.services = res;    
        console.log(this.services);
        
      },
      error: (err) => {
        console.error('Error fetching services', err);
      }
    });
  }
}