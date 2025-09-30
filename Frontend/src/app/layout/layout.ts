import { Component } from '@angular/core';
import { Home } from './home/home';
import { RouterOutlet } from '@angular/router';
import { Projects } from './projects/projects';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}
