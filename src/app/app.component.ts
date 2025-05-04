import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component'; //cambiar de acuerdo a que html abrir
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, FormsModule],  //tambien esto
  template: `<app-login></app-login>`,
})
export class AppComponent {}
