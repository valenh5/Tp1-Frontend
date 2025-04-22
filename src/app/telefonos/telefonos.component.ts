import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { CommonModule } from '@angular/common';

const apiUrl = "http://localhost:3000/telefonos";

@Component({
  selector: 'app-telefonos',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.css']
})
export class TelefonosComponent implements OnInit {
  telefonos: any[] = [];
  telefonoNuevo: any = { marca: '', modelo: '', esSmartphone: false };
  telefonoEditando: any = null;
  mostrarFormulario: boolean = false;

  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.cargarTelefonos();
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario; 
  }

  async cargarTelefonos(): Promise<void> {
    try {
      const response = await axios.get(apiUrl); 
      this.telefonos = response.data;
    } catch (error) {
      console.error("Error al cargar telefonos:", error);
    }
  }

  async crearTelefono(): Promise<void> {
    try {
      await axios.post(apiUrl, this.telefonoNuevo);
      await this.cargarTelefonos();
      this.telefonoNuevo = { marca: '', modelo: '', esSmartphone: false };
      alert(`Teléfono creado: ${this.telefonoNuevo.marca} ${this.telefonoNuevo.modelo}`);
    } catch (error) {
      console.error("Error al crear telefono:", error);
      alert("Hubo un error al crear el teléfono. Por favor, intenta de nuevo.");
    }
  }
  

  editarTelefono(telefono: any): void {
    this.telefonoEditando = { ...telefono };
  }

  async guardarCambios(): Promise<void> {
    if (this.telefonoEditando?.id !== undefined && this.telefonoEditando?.id !== 0) {
      try {
        await axios.put(apiUrl + `/${this.telefonoEditando.id}`, {
          marca: this.telefonoEditando.marca,
          modelo: this.telefonoEditando.modelo,
          esSmartphone: this.telefonoEditando.esSmartphone
        });
        await this.cargarTelefonos();
        this.telefonoEditando = null; 
        alert("Telefono editado")
      } catch (error) {
        console.error("Error al guardar cambios:", error);
      }
    } else {
      console.warn("No se puede guardar cambios: ID invalido.");
    }
  }


    async eliminarTelefono(id: number): Promise<void> {
      try {
        await axios.delete(apiUrl + `/${id}`);
        await this.cargarTelefonos();
        alert("Telefono eliminado");
      } catch (error) {
        console.error("Error al eliminar telefono:", error);
      }
    }
  }
