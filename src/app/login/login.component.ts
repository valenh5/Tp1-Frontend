import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import * as yaml from 'js-yaml';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  usuarios: any[] = [];
  username = '';
  password = '';
  mensaje = '';

  async ngOnInit() {
    try {
      const response = await axios.get('assets/usuarios.yml', { responseType: 'text' });
      const parsed: any = yaml.load(response.data);
      this.usuarios = parsed.usuarios;
    } catch (error) {
      console.error('Error al cargar YAML:', error);
    }
  }

  login() {
    const user = this.usuarios.find(
      (u) => u.usuario === this.username && u.password === this.password
    );
    this.mensaje = user ? 'Login exitoso' : 'Usuario o contraseña incorrectos';
  }
}
