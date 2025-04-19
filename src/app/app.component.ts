import { Component } from '@angular/core';
import { TelefonosComponent } from './telefonos/telefonos.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TelefonosComponent, CommonModule], 
  template: `<app-telefonos></app-telefonos>`,
})
export class AppComponent {}
