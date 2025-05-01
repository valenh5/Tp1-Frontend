import { Injectable } from '@angular/core';
import axios from 'axios';
import { Telefono } from '../modelos/telefono';

@Injectable({
  providedIn: 'root'
})
export class TelefonosService {
  private apiUrl = 'http://localhost:3000/telefonos'; 

  async getTelefonos(): Promise<Telefono[]> {
    const response = await axios.get<Telefono[]>(this.apiUrl);
    return response.data;
  }

  async agregarTelefono(telefono: Telefono): Promise<Telefono> {
    const response = await axios.post<Telefono>(this.apiUrl, telefono);
    return response.data;
  }

  async eliminarTelefono(id: number): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }

  async actualizarTelefono(telefono: Telefono): Promise<Telefono> {
    const response = await axios.put<Telefono>(`${this.apiUrl}/${telefono.id}`, telefono);
    return response.data;
  }
}
