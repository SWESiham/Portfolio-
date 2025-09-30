import { Routes } from '@angular/router';
import { Home } from './layout/home/home';
import { Home as dashboardHome } from './dashboard/home/home';
import { Layout } from './layout/layout';
import { About } from './layout/about/about';
import { Contact } from './layout/contact/contact';
import { Projects } from './layout/projects/projects';
import { Skills } from './layout/skills/skills';
import { Services } from './layout/services/services';
import { Experiences } from './layout/experiences/experiences';
import { Dashboard } from './dashboard/dashboard';
import { AboutDashboard } from './dashboard/about-dashboard/about-dashboard';
import { ServicesDashboard } from './dashboard/services-dashboard/services-dashboard';
import { ProjectsDashboard } from './dashboard/projects-dashboard/projects-dashboard';
import { SkillsDashboard } from './dashboard/skills-dashboard/skills-dashboard';
import { ContactDashboard } from './dashboard/contact-dashboard/contact-dashboard';

export const routes: Routes = [

    {
        path: '', component: Layout, children: [
            {path:'',redirectTo:'home',pathMatch:'full'},
            {path:'home', component:Home},
            {path:'about', component:About},
            {path:'contact', component:Contact},
            {path:'projects', component:Projects},
            {path:'skills', component:Skills},
            {path:'services', component:Services},
            {path:'experiences', component:Experiences},
        ]
    }, {
        path: 'dashboard', component: Dashboard, children: [
            {path:'', component:dashboardHome},
            {path:'about', component:AboutDashboard},
            {path:'services', component:ServicesDashboard},
            {path:'projects', component:ProjectsDashboard},
            {path:'skills', component:SkillsDashboard},
            {path:'contact', component:ContactDashboard},
        ]
    }

];
