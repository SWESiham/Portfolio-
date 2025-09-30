import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { ProjectService } from '../core/services/project-service';
import { SkillService } from '../core/services/skill-service';
import { ContactService } from '../core/services/contact-service';
import { IContact } from '../core/models/icontact';
import { IProject } from '../core/models/iproject';
import { ISkill } from '../core/models/iskill';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,Header],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
 
  
}
