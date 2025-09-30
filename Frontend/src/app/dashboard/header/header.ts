import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterModule, CommonModule, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  
isDarkMode = true;

ngOnInit(): void {
  const theme = localStorage.getItem('theme');
  this.isDarkMode = theme === 'dark';
  this.applyTheme();
}

  open = true;
  toggleSidebar() {
    this.open = !this.open
  }


  
toggleTheme(): void {
  this.isDarkMode = !this.isDarkMode;
  this.applyTheme();

  localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
}

applyTheme(): void {
  const body = document.body;
  if (this.isDarkMode) {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
  } else {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
  }
}

}