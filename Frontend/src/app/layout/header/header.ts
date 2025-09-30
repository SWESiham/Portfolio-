import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{

isDarkMode = true;

  
ngOnInit(): void {
  const theme = localStorage.getItem('theme');
  this.isDarkMode = theme === 'dark';
  this.applyTheme();
}

toggleTheme(): void {
  this.isDarkMode = !this.isDarkMode;
  this.applyTheme();

  localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
}
  
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen != this.isMenuOpen;
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
